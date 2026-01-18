import React from "react";
import { Table, Tag, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";

export type PaymentStatus = "success" | "pending" | "failed";

export interface PaymentRecord {
  id: string | number;
  paymentNumber: string;
  beneficiary: string;
  date: string;
  status: PaymentStatus;
  amount: number;
}

export interface PaymentTableProps {
  data?: PaymentRecord[];
  loading?: boolean;
  title?: string;
  showTitle?: boolean;
  onRowClick?: (record: PaymentRecord) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Status configuration
const statusConfig: Record<
  PaymentStatus,
  { label: string; color: string; bgColor: string }
> = {
  success: {
    label: "تمت بنجاح",
    color: "#52c41a",
    bgColor: "#f6ffed",
  },
  pending: {
    label: "قيد المعالجة",
    color: "#faad14",
    bgColor: "#fffbe6",
  },
  failed: {
    label: "فشلت العملية",
    color: "#ff4d4f",
    bgColor: "#fff2f0",
  },
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    direction: "rtl",
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1a1a2e",
    marginBottom: "16px",
    textAlign: "right",
  },
  tableWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
  },
};

export default function PaymentTable({
  data = [],
  loading = false,
  title = "سجل المدفوعات",
  showTitle = true,
  onRowClick,
  className,
  style,
}: PaymentTableProps) {
  const columns: ColumnsType<PaymentRecord> = [
    {
      title: "رقم الدفعة",
      dataIndex: "paymentNumber",
      key: "paymentNumber",
      align: "center",
      width: 120,
      render: (text) => (
        <span style={{ color: "#1890ff", fontWeight: 500 }}>{text}</span>
      ),
    },
    {
      title: "المستفيد",
      dataIndex: "beneficiary",
      key: "beneficiary",
      align: "center",
      ellipsis: true,
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 120,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 130,
      render: (status: PaymentStatus) => {
        const config = statusConfig[status];
        return (
          <Tag
            style={{
              color: config.color,
              backgroundColor: config.bgColor,
              border: "none",
              borderRadius: "6px",
              padding: "4px 12px",
              fontWeight: 500,
              fontSize: "13px",
            }}
          >
            {config.label}
          </Tag>
        );
      },
    },
    {
      title: "قيمة الدفعة",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 130,
      render: (amount: number) => (
        <span style={{ fontWeight: 500 }}>{amount} جنيه</span>
      ),
    },
  ];

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
          colorPrimary: "#1890ff",
          borderRadius: 8,
        },
        components: {
          Table: {
            headerBg: "#fafafa",
            headerColor: "#8c8c8c",
            headerSplitColor: "transparent",
            cellPaddingBlock: 16,
            cellPaddingInline: 16,
            fontSize: 14,
            rowHoverBg: "#f5f7fa",
          },
        },
      }}
    >
      <div style={{ ...styles.container, ...style }} className={className}>
        {showTitle && <h3 style={styles.title}>{title}</h3>}
        <div style={styles.tableWrapper}>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={false}
            onRow={(record) => ({
              onClick: () => onRowClick?.(record),
              style: { cursor: onRowClick ? "pointer" : "default" },
            })}
            locale={{
              emptyText: "لا توجد مدفوعات",
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
}
