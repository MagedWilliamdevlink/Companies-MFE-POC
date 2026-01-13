import React from "react";
import { Steps, ConfigProvider } from "antd";
import "./VerticalStepper.css";

export interface StepItem {
  title: string;
}

export interface VerticalStepperProps {
  // Header
  headerTitle?: string;
  headerDescription?: string;
  // Steps
  steps?: StepItem[];
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

const defaultSteps: StepItem[] = [
  { title: "الخطوة الأولى" },
  { title: "الخطوة الثانية" },
  { title: "الخطوة الثالثة" },
  { title: "الدفع الالكتروني" },
  { title: "الخطوة الخامسة" },
];

export default function VerticalStepper({
  headerTitle,
  headerDescription,
  steps = defaultSteps,
  currentStep = 0,
  onStepChange,
}: VerticalStepperProps) {
  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
          colorPrimary: "#1890ff",
        },
        components: {
          Steps: {
            // Icon sizes
            navArrowColor: "#red",
            iconSize: 24,
            iconFontSize: 12,
            // Colors
            colorPrimary: "#1890ff",
            // Spacing
            titleLineHeight: 24,
          },
        },
      }}
    >
      <div
        style={{
          fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Header */}
        {(headerTitle || headerDescription) && (
          <div style={{ marginBottom: "24px", textAlign: "right" }}>
            {headerTitle && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#1890ff",
                  fontWeight: 500,
                  margin: "0 0 8px 0",
                }}
              >
                {headerTitle}
              </p>
            )}
            {headerDescription && (
              <h2
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: 0,
                  lineHeight: "26px",
                }}
              >
                {headerDescription}
              </h2>
            )}
          </div>
        )}

        <Steps
          className="custom-stepper-vertical"
          orientation="vertical"
          current={currentStep}
          onChange={onStepChange}
          items={steps}
        />
      </div>
    </ConfigProvider>
  );
}
