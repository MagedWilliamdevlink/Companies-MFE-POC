"use client";

import { fetchServices, getServiceById } from "@/data/services";
import {
  createRequest,
  getRequestsByServiceSortedByTimestamp,
} from "@/utils/requestStorage";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const createNewService = (serviceID, router) => {
  fetchServices().then((services) => {
    const getSevice = getServiceById(serviceID, services);
    console.log(getSevice);
    const generatedRequest = createRequest(
      getSevice?.id,
      getSevice?.title,
      getSevice?.category,
    );
    console.log(generatedRequest);
    router.push(
      `/services/${generatedRequest.serviceId}/${generatedRequest.requestId}`,
    );
  });
};

export default function ApplyToService() {
  const params = useParams<{ serviceID: string }>();
  const { serviceID } = params;
  const [serviceAlreadyExists, setServiceAlreadyExists] = useState({});
  const router = useRouter();

  useEffect(() => {
    // check if a service already exists
    (() => {
      const myRequests = getRequestsByServiceSortedByTimestamp(serviceID);
      setServiceAlreadyExists((myRequests.length && myRequests[0]) || {});
    })();
  }, [serviceID]);

  return (
    <>
      {serviceAlreadyExists.hasOwnProperty("serviceId") ? (
        <>
          <div>you already registered in this service, want to continue?</div>
          <Link
            href={`/services/${serviceAlreadyExists.serviceId}/${serviceAlreadyExists.requestId}`}
          >
            continue the request
          </Link>
        </>
      ) : (
        <>
          Terms and Conditions: -----
          <br />
          <button onClick={() => createNewService(serviceID, router)}>
            Start service
          </button>
        </>
      )}
    </>
  );
}
