import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import FormInput from "../../../shell/src/components/shared/FormInput";

export const FormInputParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: FormInput,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>FormInput failed to load</div>;
  },
});
