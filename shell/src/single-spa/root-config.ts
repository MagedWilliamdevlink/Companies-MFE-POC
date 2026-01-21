import { registerApplication, start, unregisterApplication, getAppStatus, SKIP_BECAUSE_BROKEN } from "single-spa";
import { fetchServices } from "../data/services";

// Declare SystemJS type (loaded via script tag)
declare const System: {
  import(name: string): Promise<any>;
};

// Extend window type for single-spa
declare global {
  interface Window {
    singleSpa?: {
      triggerAppChange: () => void;
    };
  }
}

let started = false;
let registeredApps = new Set<string>();
let servicesData: any[] = [];

export async function startSingleSpa() {
  if (started) return;
  started = true;

  try {
    // Fetch services dynamically
    const services = await fetchServices();
    servicesData = services;
    
    // Register all microApps from services array
    services
      .filter(service => service.hostType === "microApp")
      .forEach(service => {
        registerApplication({
          name: service.hostInfo.org,
          app: () => System.import(service.hostInfo.org),
          activeWhen: [service.ctaLink],
        });
        registeredApps.add(service.hostInfo.org);
      });

    start();
  } catch (error) {
    console.error('Failed to start single-spa:', error);
    // Start anyway to prevent blocking
    start();
  }
}

// Function to re-register an app to ensure it uses the correct mount point
export async function reregisterApp(orgName: string) {
  try {
    const service = servicesData.find(s => s.hostInfo.org === orgName);
    if (!service) {
      console.error(`Service not found for org: ${orgName}`);
      return;
    }

    console.log(`Re-registering app: ${orgName}`);
    console.log(`Current URL: ${window.location.pathname}`);
    console.log(`Service ctaLink: ${service.ctaLink}`);
    
    // Check if app is already registered
    const appStatus = getAppStatus(orgName);
    console.log(`Current app status: ${appStatus}`);
    
    if (appStatus !== SKIP_BECAUSE_BROKEN && registeredApps.has(orgName)) {
      console.log(`Unregistering existing app: ${orgName}`);
      await unregisterApplication(orgName);
      registeredApps.delete(orgName);
    }

    // Clean up any existing mount points created by single-spa
    const mountPointId = `single-spa-application:${orgName}`;
    const existingMountPoints = document.querySelectorAll(`[id="${mountPointId}"]`);
    existingMountPoints.forEach((element, index) => {
      // Keep only the first one (should be our service page mount point)
      if (index > 0) {
        console.log(`Removing duplicate mount point: ${mountPointId}`);
        element.remove();
      }
    });

    // Verify mount point exists
    const mountPoint = document.getElementById(mountPointId);
    if (!mountPoint) {
      console.error(`Mount point ${mountPointId} not found during re-registration`);
      return;
    }
    console.log(`Mount point verified: ${mountPointId}`, mountPoint);

    // Re-register the application
    console.log(`Registering app with activeWhen: ${service.ctaLink}`);
    registerApplication({
      name: orgName,
      app: () => {
        console.log(`Loading app: ${orgName}`);
        return System.import(orgName).then(module => {
          console.log(`App loaded successfully: ${orgName}`, module);
          return module;
        }).catch(error => {
          console.error(`Failed to load app ${orgName}:`, error);
          throw error;
        });
      },
      activeWhen: [service.ctaLink],
    });

    registeredApps.add(orgName);
    
    // Small delay before triggering app change
    setTimeout(() => {
      console.log(`Triggering app change for: ${orgName}`);
      if (window.singleSpa) {
        window.singleSpa.triggerAppChange();
      }
      
      // Check app status after trigger
      setTimeout(() => {
        const newStatus = getAppStatus(orgName);
        console.log(`App status after trigger: ${newStatus}`);
      }, 1000);
    }, 100);
    
    console.log(`Successfully re-registered app: ${orgName}`);
  } catch (error) {
    console.error(`Failed to re-register app ${orgName}:`, error);
  }
}
