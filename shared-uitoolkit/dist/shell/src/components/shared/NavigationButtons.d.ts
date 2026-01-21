export interface NavigationButtonsProps {
    onNext?: () => void;
    nextLabel?: string;
    nextDisabled?: boolean;
    nextHidden?: boolean;
    onPrevious?: () => void;
    previousLabel?: string;
    previousDisabled?: boolean;
    previousHidden?: boolean;
    onBackToServices?: () => void;
    backToServicesLabel?: string;
    backToServicesHidden?: boolean;
}
export default function NavigationButtons({ onNext, nextLabel, nextDisabled, nextHidden, onPrevious, previousLabel, previousDisabled, previousHidden, onBackToServices, backToServicesLabel, backToServicesHidden, }: NavigationButtonsProps): import("react/jsx-runtime").JSX.Element;
