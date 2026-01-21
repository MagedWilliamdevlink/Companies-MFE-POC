import React from "react";
export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit" | "reset";
}
export default function Button({ children, onClick, disabled, fullWidth, variant, size, className, type, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
