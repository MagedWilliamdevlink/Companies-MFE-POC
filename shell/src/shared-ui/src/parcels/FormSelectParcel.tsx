import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import FormSelect from "../components/FormSelect";

export const FormSelectParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: FormSelect,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>FormSelect failed to load</div>;
  },
});
