"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Table,
  Input,
  DatePicker,
  Select,
  Button,
  Dropdown,
  ConfigProvider,
} from "antd";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { SearchOutlined, MoreOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import PageHeader from "@/components/PageHeader";
import type { MenuProps } from "antd";
import { getAllRequests } from "@/utils/requestStorage";

// Request Status Types
type RequestStatus =
  | "تتطلب التوقيع"
  | "تتطلب الدفع"
  | "يتطلب التعديل"
  | "مكتمل"
  | "قيد المراجعة";

// Request Data Interface
interface RequestData {
  key: string;
  requestNumber: string;
  serviceName: string;
  companyName: string;
  status: RequestStatus;
  creationDate: string;
}

// Status Badge Colors
const getStatusColor = (status: RequestStatus): string => {
  if (
    status.toLocaleLowerCase().includes("requir") ||
    status.toLocaleLowerCase().includes("need") ||
    status.toLocaleLowerCase().includes("wait")
  ) {
    return {
      bg: "#FFF3EB",
      text: "#B5530D",
    };
  }
  if (
    status.toLocaleLowerCase().includes("complete") ||
    status.toLocaleLowerCase().includes("succe")
  ) {
    return {
      bg: "#D2FFD4",
      text: "#065B28",
    };
  }
  return null;
};

export default function MyRequestsPage() {
  const router = useRouter();
  const [requestNumber, setRequestNumber] = useState("");
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [requestStatus, setRequestStatus] = useState<string | undefined>(
    undefined,
  );
  const [companyName, setCompanyName] = useState<string | undefined>(undefined);
  const [serviceType, setServiceType] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [requests, setRequests] = useState<RequestData[]>([]);

  // Load requests from storage on mount
  useEffect(() => {
    const loadRequests = () => {
      try {
        const storedRequests = getAllRequests();
        console.log(storedRequests);
        // Convert stored requests to RequestData format
        const formattedRequests: RequestData[] = storedRequests.map((req) => ({
          key: req.requestId,
          requestNumber: req.requestId,
          serviceName: req.serviceName,
          companyName: req.companyName,
          status: req.currentStep,
          creationDate: req.creationDate,
          creationTimeStamp: req.creationTimeStamp,
        }));

        // Merge with mock data (for now, later remove mock data)
        setRequests([...formattedRequests]);
      } catch (error) {
        console.error("Error loading requests:", error);
      }
    };

    loadRequests();

    // Refresh requests when storage changes
    const handleStorageChange = () => {
      loadRequests();
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen to custom event for same-tab updates
    window.addEventListener("requestUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("requestUpdated", handleStorageChange);
    };
  }, []);

  // Filter options
  const statusOptions = [
    { value: "تتطلب التوقيع", label: "تتطلب التوقيع" },
    { value: "تتطلب الدفع", label: "تتطلب الدفع" },
    { value: "يتطلب التعديل", label: "يتطلب التعديل" },
    { value: "مكتمل", label: "مكتمل" },
    { value: "قيد المراجعة", label: "قيد المراجعة" },
  ];

  const companyOptions = [
    {
      value: "الهلال للأستثمار والتنمية العمرانية",
      label: "الهلال للأستثمار والتنمية العمرانية",
    },
    { value: "شركة الرؤية الحديثة", label: "شركة الرؤية الحديثة" },
    { value: "شركة النور للتجارة", label: "شركة النور للتجارة" },
    { value: "شركة المستقبل", label: "شركة المستقبل" },
  ];

  const serviceTypeOptions = [
    {
      value: "التصديق على محاضر الجمعيات العامة ومجالس الإدارة",
      label: "التصديق على محاضر الجمعيات العامة ومجالس الإدارة",
    },
    {
      value: "التصديق على قوائم مجالس الادارة المساهمين/الشركاء/المديرين",
      label: "التصديق على قوائم مجالس الادارة المساهمين/الشركاء/المديرين",
    },
    { value: "مراجعة الحسابات السنوية", label: "مراجعة الحسابات السنوية" },
    { value: "تسجيل الشركات", label: "تسجيل الشركات" },
    { value: "تجديد الترخيص", label: "تجديد الترخيص" },
  ];

  // Filter data
  const filteredRequests = useMemo(() => {
    let filtered = [...requests];

    if (requestNumber) {
      filtered = filtered.filter((req) =>
        req.requestNumber.toLowerCase().includes(requestNumber.toLowerCase()),
      );
    }

    if (dateFrom) {
      filtered = filtered.filter((req) => {
        const reqDate = dayjs(req.creationDate, "YYYY/M/D");
        return reqDate.isAfter(dateFrom) || reqDate.isSame(dateFrom, "day");
      });
    }

    if (dateTo) {
      filtered = filtered.filter((req) => {
        const reqDate = dayjs(req.creationDate, "YYYY/M/D");
        return reqDate.isBefore(dateTo) || reqDate.isSame(dateTo, "day");
      });
    }

    if (requestStatus) {
      // console.log(requestStatus);
      // filtered = requestStatus;
      filtered = filtered.filter((req) => req.status === requestStatus);
    }

    if (companyName) {
      filtered = filtered.filter((req) => req.companyName === companyName);
    }

    if (serviceType) {
      filtered = filtered.filter((req) => req.serviceName === serviceType);
    }

    return filtered;
  }, [
    requests,
    requestNumber,
    dateFrom,
    dateTo,
    requestStatus,
    companyName,
    serviceType,
  ]);

  // Reset filters
  const handleReset = () => {
    setRequestNumber("");
    setDateFrom(null);
    setDateTo(null);
    setRequestStatus(undefined);
    setCompanyName(undefined);
    setServiceType(undefined);
    setCurrentPage(1);
  };

  // Action menu items
  const getActionMenuItems = (record: RequestData): MenuProps["items"] => [
    {
      key: "view",
      label: "عرض التفاصيل",
    },
    {
      key: "edit",
      label: "تعديل",
    },
    {
      key: "delete",
      label: "حذف",
      danger: true,
    },
  ];

  // Table columns
  const columns: TableColumnsType<RequestData> = [
    {
      title: "رقم الطلب",
      dataIndex: "requestNumber",
      key: "requestNumber",
      sorter: (a, b) => a.requestNumber.localeCompare(b.requestNumber),
      width: 150,
      render: (text: string, record: RequestData) => {
        // Extract service ID from requestNumber if it's a requestId format
        const isRequestId = text.startsWith("REQ-");
        if (isRequestId) {
          // Extract service ID from the request (we need to get it from storage)
          const storedRequests = getAllRequests();
          const storedRequest = storedRequests.find(
            (r) => r.requestId === text,
          );
          if (storedRequest) {
            return (
              <Link
                href={`/services/${storedRequest.serviceId}/${text}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {text}
              </Link>
            );
          }
        }
        return text;
      },
    },
    {
      title: "اسم الخدمة",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      width: 300,
    },
    {
      title: "اسم الشركة",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      width: 250,
    },
    {
      title: "حالة الطلب",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      width: 180,
      render: (status: RequestStatus) => (
        <Button
          type="primary"
          size="small"
          style={{
            backgroundColor:
              getStatusColor(status) && getStatusColor(status).bg,
            borderColor: getStatusColor(status) && getStatusColor(status).bg,
            color: getStatusColor(status) && getStatusColor(status).text,
            boxShadow: "none",
            fontWeight: 500,
          }}
        >
          {status}
        </Button>
      ),
    },
    {
      title: "تاريخ الإنشاء",
      dataIndex: "creationDate",
      key: "creationDate",
      sorter: (a, b) => {
        const dateA = dayjs(a.creationDate, "YYYY/M/D");
        const dateB = dayjs(b.creationDate, "YYYY/M/D");
        return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
      },
      width: 150,
    },
    {
      title: "",
      key: "action",
      width: 50,
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            style={{ fontSize: "18px" }}
          />
        </Dropdown>
      ),
    },
  ];

  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "طلباتي", href: "/my-requests" },
  ];

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredRequests.length,
    onChange: (page: number, size: number) => {
      setCurrentPage(page);
      setPageSize(size);
    },
    showSizeChanger: false,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} من ${total}`,
    pageSizeOptions: ["10", "20", "50"],
  };

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
      }}
    >
      <div className="bg-[#f5f6f9] min-h-screen">
        <Breadcrumb customBreadcrumbs={breadcrumbs} />

        <div className="px-4 md:px-16 2xl:px-52 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <PageHeader title="طلباتي" />
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Request Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الطلب
                </label>
                <Input
                  placeholder="ابحث برقم الطلب"
                  prefix={<SearchOutlined />}
                  value={requestNumber}
                  onChange={(e) => setRequestNumber(e.target.value)}
                  size="large"
                />
              </div>

              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التاريخ من
                </label>
                <DatePicker
                  placeholder="اختر..."
                  value={dateFrom}
                  onChange={(date) => setDateFrom(date)}
                  format="YYYY/M/D"
                  size="large"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التاريخ إلى
                </label>
                <DatePicker
                  placeholder="اختر..."
                  value={dateTo}
                  onChange={(date) => setDateTo(date)}
                  format="YYYY/M/D"
                  size="large"
                  style={{ width: "100%" }}
                />
              </div>

              {/* Request Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حالة الطلب
                </label>
                <Select
                  placeholder="-- اضغط للاختيار --"
                  value={requestStatus}
                  onChange={setRequestStatus}
                  options={statusOptions}
                  size="large"
                  style={{ width: "100%" }}
                  allowClear
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الشركة
                </label>
                <Select
                  placeholder="-- اضغط للاختيار --"
                  value={companyName}
                  onChange={setCompanyName}
                  options={companyOptions}
                  size="large"
                  style={{ width: "100%" }}
                  allowClear
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع الخدمة
                </label>
                <Select
                  placeholder="-- اضغط للاختيار --"
                  value={serviceType}
                  onChange={setServiceType}
                  options={serviceTypeOptions}
                  size="large"
                  style={{ width: "100%" }}
                  allowClear
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 justify-end">
              <Button
                type="default"
                size="large"
                onClick={handleReset}
                style={{
                  borderColor: "#1890ff",
                  color: "#1890ff",
                }}
              >
                اعادة التعيين
              </Button>
              <Button type="primary" size="large">
                تصفية
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-4 text-lg font-medium text-gray-700">
              الطلبات المتاحة : {filteredRequests.length}
            </div>

            <Table
              columns={columns}
              dataSource={filteredRequests}
              pagination={paginationConfig as TablePaginationConfig}
              scroll={{ x: 1000 }}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
