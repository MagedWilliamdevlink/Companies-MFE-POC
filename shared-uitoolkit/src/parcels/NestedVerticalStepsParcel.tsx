import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import NestedVerticalSteps from "../../../shell/src/components/shared/NestedVerticalSteps";

export const NestedVerticalStepsParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NestedVerticalSteps,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>NestedVerticalSteps failed to load</div>;
  },
});
