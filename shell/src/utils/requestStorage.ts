// Request storage utility using localStorage
export interface RequestData {
  requestId: string;
  serviceId: string;
  serviceName: string;
  companyName: string;
  status:
    | ""
    | "تتطلب التوقيع"
    | "تتطلب الدفع"
    | "يتطلب التعديل"
    | "مكتمل"
    | "قيد المراجعة";
  creationDate: string;
  creationTimeStamp: number;
  currentStep: string;
  completedSteps: number[];
  formData: Record<string, any>;
}

const STORAGE_KEY = "service_requests";

// Generate a unique request ID
export function generateRequestId(): string {
  return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Mock Data - Keep for fallback
const mockRequests = [
  {
    requestId: "REQ-1769532001800-4nos67ak8",
    serviceId: "service-a",
    serviceName: "خدمة التراخيص الإلكترونية",
    companyName: "تراخيص",
    status: "",
    creationTimeStamp: 1769532001806,
    creationDate: "٢٧‏/١‏/٢٠٢٦",
    currentStep: "NEW",
    completedSteps: [],
    formData: {},
  },
  {
    requestId: "REQ-1769532033417-k92pavr8k",
    serviceId: "service-a",
    serviceName: "خدمة التراخيص الإلكترونية",
    companyName: "تراخيص",
    status: "",
    creationTimeStamp: 1769532033423,
    creationDate: "٢٧‏/١‏/٢٠٢٦",
    currentStep: "awaitingReview",
    completedSteps: [],
    formData: {
      formEntry: {
        companyName: "sss",
        companyType: "limited_partnership",
        activityType: "manufacturing",
        commercialRegister: "234",
        capital: "443",
      },
    },
    machineSnapshot: {
      status: "active",
      context: {
        isFormValid: true,
        isReviewed: false,
        isPaymentCompleted: false,
        isShippingValid: false,
        isRequestComplete: false,
      },
      value: "awaitingReview",
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1769532050293-1jtfmcuob",
    serviceId: "service-a",
    serviceName: "خدمة التراخيص الإلكترونية",
    companyName: "تراخيص",
    status: "",
    creationTimeStamp: 1769532050293,
    creationDate: "٢٧‏/١‏/٢٠٢٦",
    currentStep: "paymentRequired",
    completedSteps: [],
    formData: {
      formEntry: {
        companyName: "sssss",
        companyType: "llc",
        activityType: "manufacturing",
        commercialRegister: "222",
        capital: "22",
      },
      verificationStep: {
        verified: true,
      },
    },
    machineSnapshot: {
      status: "active",
      context: {
        isFormValid: true,
        isReviewed: true,
        isPaymentCompleted: false,
        isShippingValid: false,
        isRequestComplete: false,
      },
      value: "paymentRequired",
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1769532072352-8k070urr7",
    serviceId: "service-a",
    serviceName: "خدمة التراخيص الإلكترونية",
    companyName: "تراخيص",
    status: "",
    creationTimeStamp: 1769532072353,
    creationDate: "٢٧‏/١‏/٢٠٢٦",
    currentStep: "shippingRequired",
    completedSteps: [],
    formData: {
      formEntry: {
        companyName: "sss",
        companyType: "joint_stock",
        activityType: "manufacturing",
        commercialRegister: "222",
        capital: "222",
      },
      verificationStep: {
        verified: true,
      },
    },
    machineSnapshot: {
      status: "active",
      context: {
        isFormValid: true,
        isReviewed: true,
        isPaymentCompleted: true,
        isShippingValid: false,
        isRequestComplete: false,
      },
      value: "shippingRequired",
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1769532093864-kdc1ujyg1",
    serviceId: "service-a",
    serviceName: "خدمة التراخيص الإلكترونية",
    companyName: "تراخيص",
    status: "",
    creationTimeStamp: 1769532093864,
    creationDate: "٢٧‏/١‏/٢٠٢٦",
    currentStep: "completed",
    completedSteps: [],
    formData: {
      formEntry: {
        companyName: "ssrtasrt",
        companyType: "joint_stock",
        activityType: "manufacturing",
        commercialRegister: "1234",
        capital: "234",
      },
      verificationStep: {
        verified: true,
      },
      shipping: {
        address: "asrtasrt arst asrt",
      },
    },
    machineSnapshot: {
      status: "active",
      context: {
        isFormValid: true,
        isReviewed: true,
        isPaymentCompleted: true,
        isShippingValid: true,
        isRequestComplete: true,
      },
      value: "completed",
      children: {},
      historyValue: {},
      tags: [],
    },
  },
];

// Get all requests
export function getAllRequests() {
  if (typeof window === "undefined") return [];
  try {
    if (localStorage.getItem(STORAGE_KEY)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRequests));
      return mockRequests;
    }
  } catch (error) {
    console.error("Error reading requests from storage:", error);
  }
}

// Get a specific request by ID
export function getRequest(requestId: string): RequestData | null {
  const requests = getAllRequests();
  return requests.find((r) => r.requestId === requestId) || null;
}

// Save a request
export function saveRequest(request: RequestData): void {
  if (typeof window === "undefined") return;

  try {
    const requests = getAllRequests();
    const existingIndex = requests.findIndex(
      (r) => r.requestId === request.requestId,
    );

    if (existingIndex >= 0) {
      requests[existingIndex] = request;
    } else {
      requests.push({
        ...request,
        creationTimeStamp: Date.now(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error("Error saving request to storage:", error);
  }
}

// Create a new request
export function createRequest(
  serviceId: string,
  serviceName: string,
  companyName: string = "الهلال للأستثمار والتنمية العمرانية",
): RequestData {
  const requestId = generateRequestId();
  const request: RequestData = {
    requestId,
    serviceId,
    serviceName,
    companyName,
    status: "",
    creationTimeStamp: Date.now(),
    creationDate: new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
    currentStep: "NEW",
    completedSteps: [],
    formData: {},
  };

  saveRequest(request);
  return request;
}

// Update request step and form data
export function updateRequestStep(
  requestId: string,
  step: number,
  formData?: Record<string, any>,
): void {
  const request = getRequest(requestId);
  if (!request) return;

  request.currentStep = step;
  if (formData) {
    request.formData = { ...request.formData, ...formData };
  }

  // Mark previous steps as completed
  if (!request.completedSteps.includes(step - 1) && step > 1) {
    request.completedSteps.push(step - 1);
  }

  saveRequest(request);
}

// Get requests for a specific service
export function getRequestsByService(serviceId: string): RequestData[] {
  const requests = getAllRequests();
  return requests.filter((r) => r.serviceId === serviceId);
}

export function getRequestsByServiceSortedByTimestamp(
  serviceId: string,
): RequestData[] {
  const requests = getAllRequests();
  return requests
    .filter((r) => r.serviceId === serviceId)
    .sort((a, b) => b.creationTimeStamp - a.creationTimeStamp);
}
