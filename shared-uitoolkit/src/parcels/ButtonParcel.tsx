// Following single-spa parcel documentation pattern:
// https://single-spa.js.org/docs/parcels-overview
import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Button from "../../../shell/src/components/shared/Button"

// singleSpaReact generates an object with the required lifecycles (bootstrap, mount, unmount)
export const ButtonParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Button,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>Button failed to load</div>;
  },
});
