"use client";

import Breadcrumb from "../../components/Breadcrumb";
import PageHeader from "../../components/PageHeader";
// Direct import from shared components - no parcel needed!
import PaymentTable, {
  PaymentRecord,
} from "../../components/shared/PaymentTable";

// Sample payment history data
const paymentHistoryData: PaymentRecord[] = [
  {
    id: 1,
    paymentNumber: "9871789",
    beneficiary: "الهيئة العامة للاستثمار",
    date: "25/5/2025",
    status: "success",
    amount: 5000,
  },
  {
    id: 2,
    paymentNumber: "9871790",
    beneficiary: "الهيئة العامة للاستثمار",
    date: "30/5/2025",
    status: "pending",
    amount: 7500,
  },
  {
    id: 3,
    paymentNumber: "9871791",
    beneficiary: "الهيئة العامة للاستثمار",
    date: "01/6/2025",
    status: "failed",
    amount: 10000,
  },
  {
    id: 4,
    paymentNumber: "9871792",
    beneficiary: "الهيئة العامة للاستثمار",
    date: "05/6/2025",
    status: "success",
    amount: 3000,
  },
];

export default function PaymentsPage() {
  const breadcrumbs = [
    { name: "الرئيسية", href: "/" },
    { name: "سجل المدفوعات", href: "/payments" },
  ];

  return (
    <div className="bg-[#f5f6f9] min-h-screen">
      <Breadcrumb customBreadcrumbs={breadcrumbs} />

      <div className="px-52 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <PageHeader
            title="سجل المدفوعات"
            subtitle="عرض جميع المدفوعات السابقة"
          />
        </div>

        {/* Payment History Table - Direct import, no parcel! */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <PaymentTable
            data={paymentHistoryData}
            title="سجل المدفوعات"
            showTitle
          />
        </div>
      </div>
    </div>
  );
}
