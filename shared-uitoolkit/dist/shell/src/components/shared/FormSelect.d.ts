import React from "react";
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}
export interface FormSelectProps {
    value?: string | number;
    onChange?: (value: string | number) => void;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    allowClear?: boolean;
    showSearch?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export default function FormSelect({ value, onChange, options, placeholder, disabled, error, id, allowClear, showSearch, className, style, }: FormSelectProps): import("react/jsx-runtime").JSX.Element;
