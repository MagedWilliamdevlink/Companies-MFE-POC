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
    requestId: "REQ-1770118051426-pizr4asba",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
    currentStep: "NEW",
    completedSteps: [],
    formData: {},
  },
  {
    requestId: "REQ-1770118051426-pizr4asbb",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
    currentStep: {
      applying: "confirmInformation",
    },
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "active",
      context: {
        formData: {
          formEntry: {
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {},
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770118052743,
          completion: [],
          applying: [],
          reviewing: [],
          shipping: [],
        },
        InfoConfirmed: false,
        paymentCompleted: false,
        reviewApproved: false,
        deliveryConfirmed: false,
        requestRejected: false,
      },
      value: {
        applying: "confirmInformation",
      },
      children: {},
      historyValue: {},
      tags: [],
    },
  },
  {
    requestId: "REQ-1770118051426-pizr4asbc",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
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
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
            commercialRegister: "2222",
            capital: "33333",
          },
        },
        paymentInfo: {},
        shippingInfo: {},
        Progress: {
          lastUpdated: 1770118104178,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
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
    requestId: "REQ-1770118051426-pizr4asbd",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
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
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
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
          lastUpdated: 1770118104178,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
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
    requestId: "REQ-1770118051426-pizr4asbe",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
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
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
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
          lastUpdated: 1770118163361,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770118163361,
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
    requestId: "REQ-1770118051426-pizr4asbf",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
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
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
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
          lastUpdated: 1770118194705,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770118163361,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770118194705,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770118194705,
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
    requestId: "REQ-1770118051426-pizr4asbg",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
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
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
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
            address: "this is cairo egypt",
          },
        },
        Progress: {
          lastUpdated: 1770118335825,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770118163361,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770118194705,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770118194705,
            },
          ],
          shipping: [
            {
              eventName: "تم تقديم عنوان الشحن",
              extra: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
              timestamp: 1770118335825,
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
    requestId: "REQ-1770118051426-pizr4asbh",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770118051437,
    creationDate: "٣‏/٢‏/٢٠٢٦",
    currentStep: "completed",
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "done",
      context: {
        formData: {
          formEntry: {
            companyName: "sss",
            companyType: "partnership",
            activityType: "real_estate",
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
            address: "this is cairo egypt",
          },
        },
        Progress: {
          lastUpdated: 1770118371576,
          completion: [],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770118104178,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770118163361,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770118194705,
            },
            {
              eventName: "تمت الموافقة من قبل المراجع",
              extra: "",
              timestamp: 1770118194705,
            },
          ],
          shipping: [
            {
              eventName: "تم تقديم عنوان الشحن",
              extra: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
              timestamp: 1770118335825,
            },
            {
              eventName: "تم تسليم الشحنة",
              extra: "عنوان الشحن، القاهرة، مصر، الطابق الثالث",
              timestamp: 1770118371576,
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
    requestId: "REQ-1770152357525-c6me8gb9n",
    serviceId: "service-b",
    serviceName:
      "خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة والمجمعات العمرانية",
    companyName: "تجاري",
    status: "",
    creationTimeStamp: 1770152357526,
    creationDate: "٣‏/٢‏/٢٠٢٦",
    currentStep: "rejected",
    completedSteps: [],
    formData: {},
    machineSnapshot: {
      status: "done",
      context: {
        formData: {
          formEntry: {
            companyName: "ssrts",
            companyType: "joint_stock",
            activityType: "services",
            commercialRegister: "234",
            capital: "432",
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
          lastUpdated: 1770152607245,
          completion: [
            {
              eventName: "تم رفضه من قبل المراجع تلقائياً",
              extra: "تم تجاوز موعد استحقاق الدفع",
              timestamp: 1770152607245,
            },
          ],
          applying: [
            {
              eventName: "تم إدخال المعلومات",
              extra: "",
              timestamp: 1770152371722,
            },
          ],
          reviewing: [
            {
              eventName: "تم الدفع",
              extra: "",
              timestamp: 1770152379788,
            },
            {
              eventName: "قيد المراجعة",
              extra: "",
              timestamp: 1770152607245,
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
