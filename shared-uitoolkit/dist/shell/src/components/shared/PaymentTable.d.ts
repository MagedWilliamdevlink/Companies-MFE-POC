import React from "react";
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
export default function PaymentTable({ data, loading, title, showTitle, onRowClick, className, style, }: PaymentTableProps): import("react/jsx-runtime").JSX.Element;
