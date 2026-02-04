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
    requestId: "REQ-1770197874290-p14zhwnka",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: "NEW",
    completedSteps: [],
    formData: {},
  },
  {
    requestId: "REQ-1770197874290-p14zhwnkb",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: {
      applying: "payment",
    },
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "active",
      context: {
        formData: {
          formEntry: {
            companyName: "srtasrt",
            companyType: "llc",
            activityType: "it",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {},
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770197918855,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770197918855,
            },
          ],
          reviewing: [],
          shipping: [],
        },
        InfoConfirmed: true,
        paymentCompleted: false,
        reviewApproved: false,
        deliveryConfirmed: false,
        requestRejected: false,
      },
      value: {
        applying: "payment",
      },
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770197874290-p14zhwnkc",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: {
      underReview: "waitingForReviewer",
    },
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "active",
      context: {
        formData: {
          formEntry: {
            companyName: "srtasrt",
            companyType: "llc",
            activityType: "it",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {
          feeItems: [
            {
              label: "قيمة رسم السجل التجاري",
              price: 200,
            },
            {
              label: "رسوم نقابة التجاريين",
              price: 200,
            },
            {
              label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة",
              price: 300,
            },
            {
              label: "قيمة رسم الاتحاد العام للغرف",
              price: 250,
            },
            {
              label: "قيمة رسم التوثيق",
              price: 400,
            },
          ],
        },
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770197968072,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770197918855,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770197968072,
            },
          ],
          shipping: [],
        },
        InfoConfirmed: true,
        paymentCompleted: true,
        reviewApproved: false,
        deliveryConfirmed: false,
        requestRejected: false,
      },
      value: {
        underReview: "waitingForReviewer",
      },
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770197874290-p14zhwnkd",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: {
      shipping: "enterShippingInfo",
    },
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "active",
      context: {
        formData: {
          formEntry: {
            companyName: "srtasrt",
            companyType: "llc",
            activityType: "it",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {
          feeItems: [
            {
              label: "قيمة رسم السجل التجاري",
              price: 200,
            },
            {
              label: "رسوم نقابة التجاريين",
              price: 200,
            },
            {
              label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة",
              price: 300,
            },
            {
              label: "قيمة رسم الاتحاد العام للغرف",
              price: 250,
            },
            {
              label: "قيمة رسم التوثيق",
              price: 400,
            },
          ],
        },
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770197999523,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770197918855,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770197968072,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770197999523,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770197999523,
            },
          ],
          shipping: [],
        },
        InfoConfirmed: true,
        paymentCompleted: true,
        reviewApproved: true,
        deliveryConfirmed: false,
        requestRejected: false,
      },
      value: {
        shipping: "enterShippingInfo",
      },
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770197874290-p14zhwnke",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: {
      shipping: "inTransit",
    },
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "active",
      context: {
        formData: {
          formEntry: {
            companyName: "srtasrt",
            companyType: "llc",
            activityType: "it",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {
          feeItems: [
            {
              label: "قيمة رسم السجل التجاري",
              price: 200,
            },
            {
              label: "رسوم نقابة التجاريين",
              price: 200,
            },
            {
              label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة",
              price: 300,
            },
            {
              label: "قيمة رسم الاتحاد العام للغرف",
              price: 250,
            },
            {
              label: "قيمة رسم التوثيق",
              price: 400,
            },
          ],
        },
        shippingInfo: {
          shipping: {
            address: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
          },
        },
        Progress: {
          lastUpdated: 1770198028198,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770197918855,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770197968072,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770197999523,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770197999523,
            },
          ],
          shipping: [
            {
              eventName: "تم تقديم عنوان الشحن",
              extra: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
              timestamp: 1770198028198,
            },
          ],
        },
        InfoConfirmed: true,
        paymentCompleted: true,
        reviewApproved: true,
        deliveryConfirmed: false,
        requestRejected: false,
      },
      value: {
        shipping: "inTransit",
      },
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770197874290-p14zhwnkf",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770197874310,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: "completed",
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "done",
      context: {
        formData: {
          formEntry: {
            companyName: "srtasrt",
            companyType: "llc",
            activityType: "it",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {
          feeItems: [
            {
              label: "قيمة رسم السجل التجاري",
              price: 200,
            },
            {
              label: "رسوم نقابة التجاريين",
              price: 200,
            },
            {
              label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة",
              price: 300,
            },
            {
              label: "قيمة رسم الاتحاد العام للغرف",
              price: 250,
            },
            {
              label: "قيمة رسم التوثيق",
              price: 400,
            },
          ],
        },
        shippingInfo: {
          shipping: {
            address: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
          },
        },
        Progress: {
          lastUpdated: 1770198049155,
          completion: [
            {
              eventName: "تم تسليم الشحنة",
              extra: "",
              timestamp: 1770198049155,
            },
          ],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770197918855,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770197968072,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770197999523,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770197999523,
            },
          ],
          shipping: [
            {
              eventName: "تم تقديم عنوان الشحن",
              extra: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
              timestamp: 1770198028198,
            },
            {
              eventName: "تم تأكيد استلام الشحنة من قبل البريد",
              extra: "",
              timestamp: 1770198049155,
            },
          ],
        },
        InfoConfirmed: true,
        paymentCompleted: true,
        reviewApproved: true,
        deliveryConfirmed: true,
        requestRejected: false,
      },
      value: "completed",
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770198063638-enjly9e5v",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770198063638,
    creationDate: "٤‏/٢‏/٢٠٢٦",
    currentStep: "rejected",
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "done",
      context: {
        formData: {
          formEntry: {
            companyName: "artsrat",
            companyType: "llc",
            activityType: "real_estate",
            commercialRegister: "1324",
            capital: "4312",
          },
        },
        paymentInfo: {
          feeItems: [
            {
              label: "قيمة رسم السجل التجاري",
              price: 200,
            },
            {
              label: "رسوم نقابة التجاريين",
              price: 200,
            },
            {
              label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة",
              price: 300,
            },
            {
              label: "قيمة رسم الاتحاد العام للغرف",
              price: 250,
            },
            {
              label: "قيمة رسم التوثيق",
              price: 400,
            },
          ],
        },
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770198108785,
          completion: [
            {
              eventName: "تم رفضه من قبل المراجع تلقائياً",
              extra: "تم تجاوز موعد استحقاق الدفع",
              timestamp: 1770198108785,
            },
          ],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770198080313,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770198090263,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770198108785,
            },
          ],
          shipping: [],
        },
        InfoConfirmed: true,
        paymentCompleted: true,
        reviewApproved: false,
        deliveryConfirmed: false,
        requestRejected: true,
      },
      value: "rejected",
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
