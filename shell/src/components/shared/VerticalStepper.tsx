import React, { useEffect, useState } from "react";
import { Steps, ConfigProvider } from "antd";

export interface StepItem {
  id: string;
  title: string;
  completeon: string;
}

export interface VerticalStepperProps {
  // Header
  headerTitle?: string;
  headerDescription?: string;
  // Steps
  steps?: StepItem[];
  currentStep?: string;
  onStepChange?: (step: number) => void;
}

const defaultSteps: StepItem[] = [
  { id: "0", title: "الخطوة الأولى", completeon: "step0" },
  { id: "1", title: "الخطوة الثانية", completeon: "step1" },
  { id: "2", title: "الخطوة الثالثة", completeon: "step2" },
  { id: "3", title: "الدفع الالكتروني", completeon: "step3" },
  { id: "4", title: "الخطوة الخامسة", completeon: "step4" },
];

export default function VerticalStepper({
  headerTitle,
  headerDescription,
  steps = defaultSteps,
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
          height: "100%",
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
          onChange={onStepChange}
          items={steps}
          current={-1}
        />
      </div>
    </ConfigProvider>
  );
}
