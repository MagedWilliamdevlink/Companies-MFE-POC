"use client";

import { useParams } from "next/navigation";
import { getRequest } from "../../../../../utils/requestStorage.ts";
export default function StatusPage() {
  const { serviceID, requestID } = useParams();
  const request = getRequest(requestID);

  const requestRejected = request.machineSnapshot.context.requestRejected;

  const lastUpdated =
    request.machineSnapshot?.context.Progress?.lastUpdated || 0;

  // TODO: make is arbitrary
  const appliedLogs = request.machineSnapshot?.context.Progress.applying || [];
  const reviewedLogs =
    request.machineSnapshot?.context.Progress.reviewing || [];
  const shippingLogs = request.machineSnapshot?.context.Progress.shipping || [];
  const completedLogs =
    request.machineSnapshot?.context.Progress.completion || [];

  const hasApplied = appliedLogs.length > 0;
  const hasReviewed = reviewedLogs.length > 0;
  const hasShipping = shippingLogs.length > 0;
  const hasCompleted = completedLogs.length > 0 || false;

  // TODO: make is arbitrary
  const total_steps = 4;

  const progress = requestRejected
    ? total_steps
    : [hasApplied, hasReviewed, hasShipping].filter((x) => x).length;

  return (
    <>
      {new Date(lastUpdated).toISOString()}
      <progress id="progress-bar" value={progress} max={total_steps}>
        {lastUpdated}
      </progress>
      <br />
      {hasApplied && (
        <>
          applied
          {appliedLogs.map((log) => (
            <div>
              {log.eventName}, {log.extra}, {log.timestamp}
            </div>
          ))}
          <br />
        </>
      )}
      {hasReviewed && (
        <>
          reviewed
          {reviewedLogs.map((log) => (
            <div>
              {log.eventName}, {log.extra}, {log.timestamp}
            </div>
          ))}
          <br />
        </>
      )}
      {hasShipping && (
        <>
          shipping
          {appliedLogs.map((log) => (
            <div>
              {log.eventName}, {log.extra}, {log.timestamp}
            </div>
          ))}
          <br />
        </>
      )}
      {hasCompleted && (
        <>
          Completed
          {completedLogs.map((log) => (
            <div>
              {log.eventName}, {log.extra}, {log.timestamp}
            </div>
          ))}
          <br />
        </>
      )}
      <br />
      status for {serviceID}, {requestID}
    </>
  );
}
