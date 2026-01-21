import { registerApplication, start } from "single-spa";
import { fetchServices } from "../data/services";

// Declare SystemJS type (loaded via script tag)
declare const System: {
  import(name: string): Promise<any>;
};

let started = false;

export async function startSingleSpa() {
  if (started) return;
  started = true;

  try {
    // Fetch services dynamically
    const services = await fetchServices();
    
    // Register all microApps from services array
    services
      .filter(service => service.hostType === "microApp")
      .forEach(service => {
        registerApplication({
          name: service.hostInfo.org,
          app: () => System.import(service.hostInfo.org),
          activeWhen: [service.ctaLink],
          // Note: single-spa-react automatically looks for an element with ID:
          // "single-spa-application:{org-name}"
          // So we just need to ensure that element exists in the DOM
        });
      });

    start();
  } catch (error) {
    console.error('Failed to start single-spa:', error);
    // Start anyway to prevent blocking
    start();
  }
}
