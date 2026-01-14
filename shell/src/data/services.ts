export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "pending" | "completed" | "cancelled";
  ctaLink: string;
}

export const services: Service[] = [
  {
    id: "service-a",
    title: "خدمة التراخيص الإلكترونية",
    description: "إصدار وتجديد التراخيص الإلكترونية للمنشآت والشركات بسهولة",
    category: "تراخيص",
    status: "active",
    ctaLink: "/service-a",
  },
  {
    id: "service-b",
    title: "خدمة التسجيل التجاري",
    description: "تسجيل وإدارة السجلات التجارية إلكترونياً",
    category: "تجاري",
    status: "active",
    ctaLink: "/service-b",
  },
  {
    id: "service-c",
    title: "خدمة الاستعلام عن المعاملات",
    description: "استعلام عن حالة المعاملات والطلبات الخاصة بك",
    category: "استعلامات",
    status: "active",
    ctaLink: "/service-c",
  },
  {
    id: "service-d",
    title: "خدمة الدعم الفني",
    description: "الحصول على الدعم الفني والمساعدة في استخدام الخدمات",
    category: "دعم",
    status: "pending",
    ctaLink: "/service-d",
  },
  {
    id: "service-e",
    title: "خدمة التقارير والإحصائيات",
    description: "عرض التقارير والإحصائيات الخاصة بالمعاملات",
    category: "تقارير",
    status: "active",
    ctaLink: "/service-e",
  },
  {
    id: "service-f",
    title: "خدمة إدارة المستخدمين",
    description: "إدارة حسابات المستخدمين والصلاحيات",
    category: "إدارة",
    status: "completed",
    ctaLink: "/service-f",
  },
  {
    id: "service-g",
    title: "خدمة الإشعارات",
    description: "إدارة الإشعارات والتنبيهات الخاصة بالمعاملات",
    category: "إشعارات",
    status: "active",
    ctaLink: "/service-g",
  },
  {
    id: "service-h",
    title: "خدمة الدفع الإلكتروني",
    description: "الدفع الإلكتروني للرسوم والخدمات",
    category: "مالية",
    status: "inactive",
    ctaLink: "/service-h",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function filterServices(
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
