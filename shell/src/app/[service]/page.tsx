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
        />
      </div>
    </div>
  );
}
