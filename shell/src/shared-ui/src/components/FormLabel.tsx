import React from "react";

export interface FormLabelProps {
  children?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const styles: Record<string, React.CSSProperties> = {
  label: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1a1a2e",
    marginBottom: "8px",
    display: "block",
    textAlign: "right",
  },
  required: {
    color: "#ff4d4f",
    marginRight: "4px",
  },
};

export default function FormLabel({
  children,
  required = false,
  htmlFor,
  className,
  style,
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={className}
      style={{ ...styles.label, ...style }}
    >
      {required && <span style={styles.required}>*</span>}
      {children}
    </label>
  );
}
