"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PageHeader from "../../components/PageHeader";
import { getServiceById } from "../../data/services";

export default function ServicePage() {
  const params = useParams();
  const service = params?.service as string;

  const serviceData = useMemo(() => {
    return getServiceById(service);
  }, [service]);

  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "الخدمات", href: "/services" },
    { name: serviceData?.title || service, href: `/${service}` },
  ];

  return (
    <div className="bg-[#F9FAFC]">
      <Breadcrumb customBreadcrumbs={breadcrumbs} />
      <div className="h-full min-h-full">
        {/* Microfrontend Mount Point */}
        {/* single-spa-react automatically looks for an element with this ID */}
        <div
          id={`single-spa-application:@${service}/${service}`}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
