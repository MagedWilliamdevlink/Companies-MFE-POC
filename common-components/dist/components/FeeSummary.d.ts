export interface FeeItem {
    label: string;
    price: number;
}
export interface FeeSummaryProps {
    items?: FeeItem[];
    expiryDate?: string;
    paymentTime?: string;
    onPayment?: () => void;
}
export default function FeeSummary({ items, expiryDate, paymentTime, onPayment, }: FeeSummaryProps): import("react/jsx-runtime").JSX.Element;
