import { registerApplication, start } from "single-spa";

// Declare SystemJS type (loaded via script tag)
declare const System: {
  import(name: string): Promise<any>;
};

let started = false;

export function startSingleSpa() {
  if (started) return;
  started = true;

  registerApplication({
    name: "@service-a/service-a",
    app: () => System.import("@service-a/service-a"),
    activeWhen: ["/service-a"],
    // Note: single-spa-react automatically looks for an element with ID:
    // "single-spa-application:@service-a/service-a"
    // So we just need to ensure that element exists in the DOM
  });

  start();
}
