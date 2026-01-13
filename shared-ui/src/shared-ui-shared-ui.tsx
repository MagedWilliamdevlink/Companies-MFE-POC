import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

// Export parcels for cross-framework usage (as per single-spa docs)
export { ButtonParcel } from "./parcels/ButtonParcel";
export { FeeSummaryParcel } from "./parcels/FeeSummaryParcel";

// Export React components for direct import (React-to-React only)
export { default as Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
export { default as FeeSummary } from "./components/FeeSummary";
export type { FeeSummaryProps, FeeItem } from "./components/FeeSummary";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
