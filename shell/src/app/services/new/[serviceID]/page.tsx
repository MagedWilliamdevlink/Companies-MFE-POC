"use client";

import { getRequestsByServiceSortedByTimestamp } from "@/utils/requestStorage";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyToService() {
  const params = useParams<{ serviceID: string }>();
  const { serviceID } = params;
  const [serviceAlreadyExists, setServiceAlreadyExists] = useState({});
  useEffect(() => {
    // check if a service already exists
    (() => {
      const myRequests = getRequestsByServiceSortedByTimestamp(serviceID);
      setServiceAlreadyExists((myRequests.length && myRequests[0]) || {});
    })();
  }, [serviceID]);

  return (
    <>
      ima about to apply to service {serviceID}
      {serviceAlreadyExists.hasOwnProperty("serviceId") && (
        <>
          <div>you already registered in this service, want to continue?</div>
          <Link
            href={`/services/${serviceAlreadyExists.serviceId}/${serviceAlreadyExists.requestId}`}
          >
            continue the request
          </Link>
        </>
      )}
    </>
  );
}
