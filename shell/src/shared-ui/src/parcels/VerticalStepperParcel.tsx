import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import VerticalStepper from "../../../components/shared/VerticalStepper";

export const VerticalStepperParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: VerticalStepper,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>VerticalStepper failed to load</div>;
  },
});
