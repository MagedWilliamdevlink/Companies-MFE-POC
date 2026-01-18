import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import FormLabel from "../components/FormLabel";

export const FormLabelParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: FormLabel,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>FormLabel failed to load</div>;
  },
});
