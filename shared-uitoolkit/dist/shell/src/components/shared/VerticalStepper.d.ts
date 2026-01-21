export interface StepItem {
    title: string;
}
export interface VerticalStepperProps {
    headerTitle?: string;
    headerDescription?: string;
    steps?: StepItem[];
    currentStep?: number;
    onStepChange?: (step: number) => void;
}
export default function VerticalStepper({ headerTitle, headerDescription, steps, currentStep, onStepChange, }: VerticalStepperProps): import("react/jsx-runtime").JSX.Element;
