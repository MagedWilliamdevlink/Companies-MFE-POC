"use client";

import { Button } from "@/components/shared";
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

      // createNewService(serviceID, router);
    })();
  }, [serviceID]);

  return (
    <>
      <div className="grid grid-cols-2 p-2 max-w-5xl place-self-center">
        <div>
          <img src={"/svgs/toc.svg"} />
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
