"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { fetchServices, getServiceById, Service } from "../../data/services";

export default function ServicePage() {
  const params = useParams();
  const service = params?.service as string;
  const [serviceData, setServiceData] = useState<Service | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      try {
        const services = await fetchServices();
        const foundService = getServiceById(service, services);
        setServiceData(foundService);
      } catch (error) {
        console.error('Failed to load service:', error);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [service]);

  // Re-register the app when the service page loads to ensure correct mount point
  useEffect(() => {
    if (!loading && serviceData) {
      console.log(`Service page loaded for: ${serviceData.hostInfo.org}`);
      console.log(`Current pathname: ${window.location.pathname}`);
      console.log(`Service ctaLink: ${serviceData.ctaLink}`);
      
      // Small delay to ensure the mount point DOM element is ready
      setTimeout(async () => {
        const mountPointId = `single-spa-application:${serviceData.hostInfo.org}`;
        const mountPoint = document.getElementById(mountPointId);
        
        if (mountPoint) {
          console.log(`Mount point ready: ${mountPointId}`, mountPoint);
          console.log(`Mount point parent:`, mountPoint.parentElement);
          console.log(`Mount point dimensions:`, {
            width: mountPoint.offsetWidth,
            height: mountPoint.offsetHeight,
            display: window.getComputedStyle(mountPoint).display
          });
          
          // Clear any existing content
          mountPoint.innerHTML = '';
          
          // Import and re-register the app to ensure it uses the correct mount point
          const { reregisterApp } = await import("../../single-spa/root-config");
          await reregisterApp(serviceData.hostInfo.org);
          
          // Check if content appears after a delay
          setTimeout(() => {
            console.log(`Mount point content after 2s:`, mountPoint.innerHTML);
            console.log(`Mount point children:`, mountPoint.children.length);
          }, 2000);
        } else {
          console.error(`Mount point not found: ${mountPointId}`);
        }
      }, 100);
    }
  }, [loading, serviceData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (serviceData) {
        const mountPointId = `single-spa-application:${serviceData.hostInfo.org}`;
        const mountPoint = document.getElementById(mountPointId);
        if (mountPoint) {
          mountPoint.innerHTML = '';
        }
      }
    };
  }, [serviceData]);

  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات", href: "/services" },
    { name: serviceData?.title || service, href: `/${service}` },
  ];

  if (loading) {
    return (
      <div className="bg-[#F9FAFC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الخدمة...</p>
        </div>
      </div>
    );
  }

  // Get the mount point ID from the service data
  const mountPointId = serviceData?.hostInfo?.org 
    ? `single-spa-application:${serviceData.hostInfo.org}`
    : `single-spa-application:@${service}/${service}`;

  return (
    <div className="bg-[#F9FAFC]">
      <Breadcrumb customBreadcrumbs={breadcrumbs} />
      <div className="h-full min-h-full">
        {/* Microfrontend Mount Point */}
        {/* single-spa-react automatically looks for an element with this ID */}
        <div
          id={mountPointId}
          className="h-full w-full"
          data-service={service}
          data-org={serviceData?.hostInfo?.org}
        />
      </div>
    </div>
  );
}
