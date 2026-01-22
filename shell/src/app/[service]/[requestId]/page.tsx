"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { fetchServices, getServiceById, Service } from "../../../data/services";
import { getRequest } from "../../../utils/requestStorage";

export default function ServiceRequestPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const service = params?.service as string;
  const requestId = params?.requestId as string;
  const [serviceData, setServiceData] = useState<Service | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    async function loadService() {
      try {
        const services = await fetchServices();
        const foundService = getServiceById(service, services);
        setServiceData(foundService);
        
        // If requestId is "new", this is valid - let the service component handle it
        if (requestId === "new") {
          setLoading(false);
          return;
        }
        
        // Validate that the request exists for non-"new" requestIds
        if (requestId && requestId !== "new") {
          const request = getRequest(requestId);
          if (!request && !hasRedirected.current) {
            // Request not found, redirect to new
            hasRedirected.current = true;
            router.replace(`/${service}/new`);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to load service:', error);
      } finally {
        setLoading(false);
      }
    }

    // Reset redirect flag when service or requestId changes
    hasRedirected.current = false;
    loadService();
  }, [service, requestId, router]);

  // Re-register the app when the service page loads to ensure correct mount point
  // useEffect(() => {
  //   if (!loading && serviceData) {
  //     console.log(`Service request page loaded for: ${serviceData.hostInfo.org}`);
  //     console.log(`Request ID: ${requestId}`);
  //     console.log(`Current pathname: ${window.location.pathname}`);
      
  //     // Small delay to ensure the mount point DOM element is ready
  //     setTimeout(async () => {
  //       const mountPointId = `single-spa-application:${serviceData.hostInfo.org}`;
  //       const mountPoint = document.getElementById(mountPointId);
        
  //       if (mountPoint) {
  //         console.log(`Mount point ready: ${mountPointId}`, mountPoint);
          
  //         // Don't clear innerHTML - let single-spa handle mounting/unmounting
  //         // Clearing innerHTML interferes with React root management
          
  //         // Only re-register if necessary (app is broken or not registered)
  //         const { reregisterApp } = await import("../../../single-spa/root-config");
  //         await reregisterApp(serviceData.hostInfo.org);
  //       } else {
  //         console.error(`Mount point not found: ${mountPointId}`);
  //       }
  //     }, 100);
  //   }
  // }, [loading, serviceData, requestId]);

  // Update mount point data attributes when requestId changes
  // This helps the microfrontend know when to reload/update
  useEffect(() => {
    if (serviceData && !loading) {
      const mountPointId = `single-spa-application:${serviceData.hostInfo.org}`;
      const mountPoint = document.getElementById(mountPointId);
      if (mountPoint) {
        // Update data attributes to reflect current state
        mountPoint.setAttribute('data-service', service);
        mountPoint.setAttribute('data-request-id', requestId || 'new');
        mountPoint.setAttribute('data-org', serviceData.hostInfo.org);
      }
    }
  }, [serviceData, requestId, service, loading]);

  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات", href: "/services" },
    { name: serviceData?.title || service, href: `/${service}` },
  ];

  // Get the mount point ID - use fallback if serviceData not loaded yet
  // This ensures the mount point div always exists in the DOM
  const mountPointId = serviceData?.hostInfo?.org 
    ? `single-spa-application:${serviceData.hostInfo.org}`
    : `single-spa-application:@${service}/${service}`;

  // Check if we're redirecting
  const isRedirecting = hasRedirected.current && requestId !== "new";

  return (
    <div className="bg-[#F9FAFC]">
      <Breadcrumb customBreadcrumbs={breadcrumbs} />
      <div className="h-full min-h-full relative">
        {/* Always render mount point div so single-spa can find it from the start */}
        {/* This prevents single-spa from creating placeholder divs */}
        {/* The data-request-id attribute helps the microfrontend know which request to load */}
        <div
          id={mountPointId}
          className="h-full w-full"
          data-service={service}
          data-request-id={requestId}
          data-org={serviceData?.hostInfo?.org}
        />
        
        {/* Show loading overlay if still loading or redirecting */}
        {(loading || isRedirecting) && (
          <div className="absolute inset-0 bg-[#F9FAFC] flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل الخدمة...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
