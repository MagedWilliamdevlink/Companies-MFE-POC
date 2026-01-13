// FeeSummary Parcel - following single-spa parcel documentation
import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import FeeSummary from "../components/FeeSummary";

// singleSpaReact generates an object with the required lifecycles (bootstrap, mount, unmount)
export const FeeSummaryParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: FeeSummary,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>FeeSummary failed to load</div>;
  },
});
