import React from "react";
export interface FormLabelProps {
    children?: React.ReactNode;
    required?: boolean;
    htmlFor?: string;
    className?: string;
    style?: React.CSSProperties;
}
export default function FormLabel({ children, required, htmlFor, className, style, }: FormLabelProps): import("react/jsx-runtime").JSX.Element;
