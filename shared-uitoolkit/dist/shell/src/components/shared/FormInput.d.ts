import React from "react";
export interface FormInputProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    id?: string;
    name?: string;
    type?: "text" | "password" | "email" | "number" | "tel";
    maxLength?: number;
    className?: string;
    style?: React.CSSProperties;
}
export default function FormInput({ value, onChange, placeholder, disabled, error, id, name, type, maxLength, className, style, }: FormInputProps): import("react/jsx-runtime").JSX.Element;
