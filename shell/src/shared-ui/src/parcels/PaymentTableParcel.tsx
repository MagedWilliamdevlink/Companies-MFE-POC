import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import PaymentTable from "../components/PaymentTable";

export const PaymentTableParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: PaymentTable,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>PaymentTable failed to load</div>;
  },
});
