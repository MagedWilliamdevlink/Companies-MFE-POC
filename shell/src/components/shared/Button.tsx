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

const styles: Record<string, React.CSSProperties> = {
  base: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    border: "none",
    fontFamily: "'Helvetica Neue LT Arabic', 'Helvetica Neue', sans-serif",
    fontWeight: 700,
    letterSpacing: "-0.8px",
    transition: "opacity 0.2s ease, transform 0.1s ease",
    outline: "none",
  },
  primary: {
    backgroundImage:
      "linear-gradient(-64.7327deg, rgb(28, 76, 159) 4.7619%, rgb(40, 94, 190) 100%)",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "#f2f7fe",
    color: "#2667da",
  },
  outline: {
    backgroundColor: "transparent",
    border: "2px solid #2667da",
    color: "#2667da",
  },
  sm: {
    height: "36px",
    fontSize: "14px",
    padding: "5px 16px",
  },
  md: {
    height: "50px",
    fontSize: "18px",
    padding: "5px 24px",
  },
  lg: {
    height: "60px",
    fontSize: "24px",
    padding: "5px 32px",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
};

export default function Button({
  children,
  onClick,
  disabled = false,
  fullWidth = true,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const combinedStyles: React.CSSProperties = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
    ...(fullWidth ? styles.fullWidth : {}),
    ...(disabled ? styles.disabled : {}),
    ...(isHovered && !disabled ? { opacity: 0.9 } : {}),
    ...(isPressed && !disabled ? { transform: "scale(0.98)" } : {}),
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "28px",
        }}
        dir="auto"
      >
        {children}
      </span>
    </button>
  );
}
