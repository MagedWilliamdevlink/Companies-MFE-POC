export interface StepItem {
    id: string;
    title: string;
    completeon: string;
}
export interface VerticalStepperProps {
    headerTitle?: string;
    headerDescription?: string;
    steps?: StepItem[];
    currentStep?: string;
    onStepChange?: (step: number) => void;
}
export default function VerticalStepper({ headerTitle, headerDescription, steps, onStepChange, }: VerticalStepperProps): import("react/jsx-runtime").JSX.Element;
