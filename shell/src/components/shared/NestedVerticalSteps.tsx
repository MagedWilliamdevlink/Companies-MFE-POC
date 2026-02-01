import React, { useMemo } from "react";
import { Collapse, ConfigProvider, theme } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

// XState machine interface (minimal interface since XState is not installed)
interface XStateMachine {
  value: string | object;
  matches: (state: string) => boolean;
  context: Record<string, any>;
}

// Step definition interface
export interface NestedStep {
  id: string;
  title: string;
  activeWhileState?: string;
  markCompleteOnContext?: string;
  markRejectedOnContext?: string;
  children?: NestedStep[];
}

// Component props interface
export interface NestedVerticalStepsProps {
  steps: NestedStep[];
  state: XStateMachine;
}

type StepState = "current" | "complete" | "reject" | "default";

// Helper function to check if context value is truthy
function isContextValueTruthy(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return Boolean(value);
}

// Determine step state based on XState machine
function getStepState(step: NestedStep, machine: XStateMachine): StepState {
  // Check rejection first (highest priority)
  if (step.markRejectedOnContext) {
    const contextValue = machine.context[step.markRejectedOnContext];
    if (isContextValueTruthy(contextValue)) {
      return "reject";
    }
  }

  // Check completion
  if (step.markCompleteOnContext) {
    const contextValue = machine.context[step.markCompleteOnContext];
    if (isContextValueTruthy(contextValue)) {
      return "complete";
    }
  }

  // Check if current (active)
  if (step.activeWhileState && machine.matches(step.activeWhileState)) {
    return "current";
  }

  // Check children for active state
  if (step.children) {
    const hasActiveChild = step.children.some(
      (child) =>
        child.activeWhileState && machine.matches(child.activeWhileState),
    );
    if (hasActiveChild) {
      return "current";
    }
  }

  return "default";
}

// Get icon for step state (matching Ant Design Steps component icons)
function getStepIcon(state: StepState, tokens: ReturnType<typeof theme.useToken>["token"]) {
  const iconSize = tokens.fontSizeLG;
  
  switch (state) {
    case "reject":
      return <CloseCircleOutlined style={{ color: tokens.colorError, fontSize: iconSize }} />;
    case "complete":
      return <CheckCircleOutlined style={{ color: tokens.colorTextDescription, fontSize: iconSize }} />;
    case "current":
      return <ClockCircleOutlined style={{ color: tokens.colorPrimary, fontSize: iconSize }} />;
    default:
      return <ClockCircleOutlined style={{ color: tokens.colorBorder, fontSize: iconSize }} />;
  }
}

export default function NestedVerticalSteps({
  steps,
  state,
}: NestedVerticalStepsProps) {
  const { token } = theme.useToken();

  // Calculate step states and determine which parents should be expanded
  const { stepStates, expandedKeys } = useMemo(() => {
    const states: Record<string, StepState> = {};
    const expanded: string[] = [];

    steps.forEach((step) => {
      const stepState = getStepState(step, state);
      states[step.id] = stepState;

      // Check if parent should be expanded (has active child)
      if (step.children && step.children.length > 0) {
        const hasActiveChild = step.children.some((child) => {
          const childState = getStepState(child, state);
          return childState === "current";
        });

        if (hasActiveChild) {
          expanded.push(step.id);
        }
      }
    });

    return { stepStates: states, expandedKeys: expanded };
  }, [steps, state]);

  // Render a child step
  const renderChildStep = (child: NestedStep) => {
    const childState = getStepState(child, state);
    const isCurrent = childState === "current";

    return (
      <div
        key={child.id}
        style={{
          marginRight: token.marginLG,
          marginBottom: token.marginXS,
          fontWeight: isCurrent ? token.fontWeightStrong : 400,
          color: isCurrent ? token.colorPrimary : token.colorText,
        }}
      >
        {child.title}
      </div>
    );
  };

  // Render parent step with Collapse
  const collapseItems = steps.map((step) => {
    const stepState = stepStates[step.id];
    const isCurrent = stepState === "current";
    const icon = getStepIcon(stepState, token);

    return {
      key: step.id,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: token.marginXS,
            fontWeight: isCurrent ? token.fontWeightStrong : 400,
            color: isCurrent ? token.colorPrimary : token.colorTextDescription,
          }}
        >
          {icon}
          <span>{step.title}</span>
        </div>
      ),
      children: step.children ? (
        <div>{step.children.map(renderChildStep)}</div>
      ) : null,
      showArrow: false,
    };
  });

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
        },
      }}
    >
      <div
        style={{
          fontFamily: token.fontFamily,
        }}
      >
        <Collapse
          activeKey={expandedKeys}
          items={collapseItems}
          bordered={false}
          style={{
            background: "transparent",
          }}
          ghost
          expandIcon={() => null}
        />
      </div>
    </ConfigProvider>
  );
}
