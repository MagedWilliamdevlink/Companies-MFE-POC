"use client";

import { Button } from "@/components/shared";
import { fetchServices, getServiceById } from "@/data/services";
import { createRequest } from "@/utils/requestStorage";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const createNewService = (serviceID, router) => {
  fetchServices().then((services) => {
    const getSevice = getServiceById(serviceID, services);
    console.log(getSevice);
    const generatedRequest = createRequest(
      getSevice?.id,
      getSevice?.title,
      getSevice?.companyName,
    );
    router.push(
      `/services/${generatedRequest.serviceId}/${generatedRequest.requestId}`,
    );
  });
};

export default function ApplyToService() {
  const params = useParams<{ serviceID: string }>();
  const { serviceID } = params;
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      try {
        const services = await fetchServices();
        const service = await getServiceById(serviceID, services);
        setService(service);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load service:", error);
      }
    }
    loadService();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الخدمات...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 p-2 max-w-5xl place-self-center">
        <div>
          {/*<img src={"/svgs/toc.svg"} />*/}
          <h1 className="font-bold text-2xl">{service?.title}</h1>
          <p className="font-black">وصف الخدمة</p>
          <p>{service?.description}</p>
          <br />
          <Button
            fullWidth={false}
            onClick={() => createNewService(serviceID, router)}
          >
            بدء الخدمة
          </Button>
        </div>
        <div>
          <img src={"/svgs/requireddocs.svg"} />
        </div>
      </div>
    </>
  );
}
