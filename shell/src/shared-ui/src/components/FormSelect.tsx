import React from "react";
import { Select, ConfigProvider } from "antd";

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

export default function FormSelect({
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  error,
  id,
  allowClear = true,
  showSearch = false,
  className,
  style,
}: FormSelectProps) {
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
          Select: {
            controlHeight: 44,
            fontSize: 14,
            colorBorder: error ? "#ff4d4f" : "#d9d9d9",
            optionSelectedBg: "#f2f7fe",
            optionActiveBg: "#e6f4ff",
          },
        },
      }}
    >
      <div style={styles.wrapper}>
        <Select
          id={id}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          showSearch={showSearch}
          className={className}
          style={{
            width: "100%",
            textAlign: "right",
            ...style,
          }}
          status={error ? "error" : undefined}
          filterOption={
            showSearch
              ? (input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
              : undefined
          }
        />
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </ConfigProvider>
  );
}
