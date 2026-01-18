import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import NavigationButtons from "../components/NavigationButtons";

export const NavigationButtonsParcel = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: NavigationButtons,
  errorBoundary(err, info, props) {
    return <div style={{ color: "red" }}>NavigationButtons failed to load</div>;
  },
});
