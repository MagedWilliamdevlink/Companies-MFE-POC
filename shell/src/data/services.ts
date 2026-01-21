export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "pending" | "completed" | "cancelled";
  ctaLink: string;
  hostType: "microApp" | "external"
  hostInfo: {
    org: string;
    url: string;
  };
}

// Cache for services to avoid multiple fetches
let servicesCache: Service[] | null = null;

export async function fetchServices(): Promise<Service[]> {
  if (servicesCache) {
    return servicesCache;
  }

  try {
    // Try to fetch from the static config server first, fallback to Next.js public folder
    const configServerUrl = 'http://localhost:3001/services.json';
    const fallbackUrl = '/services.json';
    
    let response;
    try {
      response = await fetch(configServerUrl);
    } catch (error) {
      console.warn('Config server not available, falling back to local services.json');
      response = await fetch(fallbackUrl);
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }
    const data = await response.json();
    servicesCache = data;
    return servicesCache || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Clear cache function for when services are updated
export function clearServicesCache() {
  servicesCache = null;
}

export function getServiceById(id: string, services: Service[]): Service | undefined {
  return services.find((service) => service.id === id);
}

export function filterServices(
  services: Service[],
  searchQuery: string = "",
  filterStatus: string = "all"
): Service[] {
  let filteredServices = services;

  // Apply status filter
  if (filterStatus !== "all") {
    filteredServices = filteredServices.filter(
      (service) => service.status === filterStatus
    );
  }

  // Apply search query
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase().trim();
    filteredServices = filteredServices.filter(
      (service) =>
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
    );
  }

  return filteredServices;
}
