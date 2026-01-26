import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Form from "../../../shell/src/components/shared/Form";

export const FormParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Form,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>Form failed to load</div>;
  },
});
