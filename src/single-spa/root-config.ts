import { registerApplication, start } from "single-spa";

let started = false;

export function startSingleSpa() {
  if (started) return;
  started = true;

  registerApplication({
    name: "@service-a/service-a",
    app: () => System.import("@service-a/service-a"),
    activeWhen: ["/service-a"],
  });

  start();
}
