import React from "react";
import { Input, ConfigProvider } from "antd";

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

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    marginBottom: "4px",
  },
  error: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontSize: "12px",
    color: "#ff4d4f",
    marginTop: "4px",
    textAlign: "right",
  },
};

export default function FormInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  id,
  name,
  type = "text",
  maxLength,
  className,
  style,
}: FormInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
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
        components: {
          Input: {
            controlHeight: 44,
            paddingInline: 16,
            fontSize: 14,
            colorBorder: error ? "#ff4d4f" : "#d9d9d9",
            colorErrorBorderHover: "#ff7875",
            hoverBorderColor: error ? "#ff7875" : "#1890ff",
            activeBorderColor: error ? "#ff4d4f" : "#1890ff",
          },
        },
      }}
    >
      <div style={styles.wrapper}>
        <Input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={className}
          style={{
            textAlign: "right",
            ...style,
          }}
          status={error ? "error" : undefined}
        />
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </ConfigProvider>
  );
}
