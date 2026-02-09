interface XStateMachine {
    value: string | object;
    matches: (state: string) => boolean;
    context: Record<string, any>;
}
export interface NestedStep {
    id: string;
    title: string;
    activeWhileState?: string;
    markCompleteOnContext?: string;
    markRejectedOnContext?: string;
    children?: NestedStep[];
}
export interface NestedVerticalStepsProps {
    steps: NestedStep[];
    state: XStateMachine;
}
export default function NestedVerticalSteps({ steps, state, }: NestedVerticalStepsProps): import("react/jsx-runtime").JSX.Element;
export {};
