"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../../utils/requestStorage.ts";
import "./style.css";
import { Button } from "@/components/shared";

import Link from "next/link";
import InProg from "./inProg";
import Done from "./done";
import { useState } from "react";
const STORAGE_KEY = "service_requests";

export default function StatusPage(props) {
  const router = useRouter();
  const [updater, setUpdater] = useState(0);
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEY) {
        setUpdater((u) => u + 1);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("requestUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("requestUpdated", handleStorageChange);
    };
  }, [router, updater]);

  return <ThePage {...props} updater={updater} />;
}

function ThePage({ updater }) {
  const { serviceID, requestID } = useParams();
  const request = getRequest(requestID);

  const requestRejected = request?.machineSnapshot?.context?.requestRejected;
  const paymentCompleted = request?.machineSnapshot?.context?.paymentCompleted;

  const lastUpdated =
    request?.machineSnapshot?.context.Progress?.lastUpdated || 0;

  // TODO: make is arbitrary
  const appliedLogs = request?.machineSnapshot?.context.Progress.applying || [];
  const reviewedLogs =
    request?.machineSnapshot?.context.Progress.reviewing || [];
  const shippingLogs =
    request?.machineSnapshot?.context.Progress.shipping || [];
  const completedLogs =
    request?.machineSnapshot?.context.Progress.completion || [];

  console.log(request?.machineSnapshot?.context?.paymentInfo?.feeItems);
  const machineState = request?.machineSnapshot?.value || null;

  const hasApplied = appliedLogs.length > 0;
  const hasReviewed = reviewedLogs.length > 0;
  const hasShipping = shippingLogs.length > 0;
  const hasCompleted = completedLogs.length > 0 || machineState === "completed";

  // TODO: make is arbitrary
  const total_steps = 4;

  const stateLookup = {
    NEW: {
      text: "طلب جديد",
      bg: "#00acc1",
    },
    applying: {
      text: "تقديم الطلب",
      bg: "#ffb300",
    },
    underReview: {
      text: "قيد المراجعة",
      bg: "#ffb300",
    },
    shipping: {
      text: "الشحن",
      bg: "#ffb300",
    },
    completed: {
      text: "تم إتمام الطلب",
      bg: "#54b5a6",
    },
    rejected: {
      text: "تم رفض الطلب",
      bg: "#EB3E3E",
    },
  };
  // const stateLookup = {
  //   applying: {
  //     fillInformation: "يرجى ملء بيانات المؤسسة",
  //     confirmInformation: "تم تأكيد البيانات",
  //     payment: "الدفع مطلوب"
  //   },
  //   underReview: {
  //     waitingForReviewer: "قيد المراجعة",
  //     rejected: "تم رفض الطلب",
  //     approved: "تمت الموافقة على الطلب"
  //   },
  //   shipping: {
  //     enterShippingInfo: "أدخل معلومات الشحن",
  //     inTransit: "في مرحلة انتقالية",
  //     delivered: "تم التوصيل"
  //   },
  //   "NEW": "طلب جديد",
  //   "completed": "تم إتمام الطلب",
  // }

  const stateToArray = () => {
    let state = machineState;
    if (machineState) {
      if (typeof machineState !== "string") {
        try {
          state = JSON.stringify(machineState)
            .replaceAll('{"', "")
            .replaceAll('"}', "")
            .split('":"');
        } catch (e) {}
      } else if (typeof machineState === "string") {
        state = [state];
      }
    }
    return state;
  };

  const getCurrentStateScope = () => {
    const getState = stateToArray();
    console.log(getState);
    if (requestRejected) {
      return stateLookup.rejected;
    }
    if (getState && getState?.length > 0) {
      return stateLookup[getState[0]];
    } else if (getState === null) {
      if (hasCompleted) {
        return stateLookup.NEW;
      } else if (request.currentStep === "NEW") {
        return stateLookup.NEW;
      } else if (requestRejected) {
        return stateLookup.rejected;
      }
    }

    return null;
  };

  // const progress = requestRejected
  //   ? total_steps
  //   : [hasApplied, hasReviewed, hasShipping].filter((x) => x).length;

  console.log(getCurrentStateScope());
  return (
    <>
      {updater}
      <br />
      <div className="container">
        {/* Left Column: Tracking & Main Status */}
        <div className="main-column">
          <header className="card detail-card">
            <div className="header-text">
              <h2
                className="text-2xl font-black"
                style={{
                  color: getCurrentStateScope().bg,
                }}
              >
                {getCurrentStateScope().text}{" "}
              </h2>

              <p>
                {lastUpdated !== 0 && new Date(lastUpdated).toDateString()}
                {lastUpdated == 0 &&
                  request?.creationTimeStamp &&
                  new Date(request.creationTimeStamp).toDateString()}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Link
                href={`/services/${request.serviceId}/${request.requestId}`}
              >
                <Button type="primary">تابع الطلب</Button>
              </Link>
            </div>
          </header>

          <section className="tracking-section">
            <h3 className="font-black text-lg pb-4">تتبع طلبك</h3>

            {hasApplied && (
              <div className="flex gap-2">
                <Done />
                <div className="card timeline-card green-border">
                  <div className="card-header">
                    <span className="label">الطلب تحت التقديم</span>
                  </div>
                  <ul className="sub-steps">
                    {appliedLogs.map((log) => (
                      <li>
                        {log.eventName}, {log.extra}{" "}
                        <span>{new Date(log.timestamp).toISOString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {hasReviewed && (
              <div className="flex gap-2">
                <InProg />

                <div className="card timeline-card yellow-border">
                  <div className="card-header">
                    <span className="label">الطلب قيد المراجعة</span>
                  </div>
                  <ul className="sub-steps">
                    {reviewedLogs.map((log) => (
                      <li>
                        {log.eventName}, {log.extra}{" "}
                        <span>{new Date(log.timestamp).toISOString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {hasShipping && (
              <div className="flex gap-2">
                <InProg />
                <div className="card timeline-card yellow-border">
                  <div className="card-header">
                    <span className="label">الشحنة في الطريق</span>
                  </div>
                  <ul className="sub-steps">
                    {shippingLogs.map((log) => (
                      <li>
                        {log.eventName}, {log.extra}{" "}
                        <span>{new Date(log.timestamp).toISOString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {hasCompleted && (
              <div className="flex gap-2">
                <Done />
                <div className="card timeline-card green-border">
                  <div className="card-header">
                    <span className="label">تم إتمام الطلب</span>
                  </div>
                  <ul className="sub-steps">
                    {completedLogs.map((log) => (
                      <li>
                        {log.eventName}, {log.extra}{" "}
                        <span>{new Date(log.timestamp).toISOString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Details & Payment */}
        <div className="side-column">
          <div className="card detail-card">
            <div className="detail-header">
              <h4 className="font-black">{request.serviceName}</h4>
            </div>
            {request?.creationTimeStamp && (
              <div className="detail-row">
                <span>تاريخ الطلب</span>{" "}
                <span>
                  {new Date(request.creationTimeStamp).toDateString()}
                </span>
              </div>
            )}
            <div className="detail-row">
              <span>رقم الطلب</span> <span>{requestID}</span>
            </div>
            {paymentCompleted && (
              <div className="detail-row">
                <span>حالة الدفع</span>{" "}
                <span className="badge-paid">مدفوع</span>
              </div>
            )}
            {hasShipping && (
              <div className="detail-row">
                <span>رقم شحنة البريد</span> <span>EKTL0164253EG</span>
              </div>
            )}
          </div>

          {request?.machineSnapshot?.context?.paymentInfo?.feeItems && (
            <>
              <div className="card detail-card">
                <div className="detail-header">
                  <h4>تفاصيل الدفع</h4>
                </div>
                <ul className="sub-steps">
                  {request?.machineSnapshot?.context?.paymentInfo?.feeItems.map(
                    (fee) => (
                      <li key={fee.label + fee.price}>
                        <div>{fee.label}</div>
                        <span>{fee.price}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </>
          )}

          {request?.machineSnapshot?.context?.shippingInfo?.shipping
            ?.address && (
            <>
              <div className="card detail-card">
                <div className="detail-header">
                  <h4>تفاصيل الشحنة</h4>
                </div>
                <ul className="sub-steps">
                  <li>
                    <div>العنوان</div>
                    <span>
                      {
                        request?.machineSnapshot?.context?.shippingInfo
                          ?.shipping?.address
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
