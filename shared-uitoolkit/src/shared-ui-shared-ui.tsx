import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

// Export parcels for cross-framework usage (as per single-spa docs)
export { ButtonParcel } from "./parcels/ButtonParcel";
export { VerticalStepperParcel } from "./parcels/VerticalStepperParcel";
export { NestedVerticalStepsParcel } from "./parcels/NestedVerticalStepsParcel";
export { NavigationButtonsParcel } from "./parcels/NavigationButtonsParcel";

// Form component parcels
export { FormLabelParcel } from "./parcels/FormLabelParcel";
export { FormInputParcel } from "./parcels/FormInputParcel";
export { FormSelectParcel } from "./parcels/FormSelectParcel";
export { FormParcel } from "./parcels/FormParcel";

export {
  default as Form,
  useForm,
  useFormInstance,
  useWatch,
  Item as FormItem,
  List as FormList,
  ErrorList as FormErrorList,
  Provider as FormProvider,
} from "../../shell/src/components/shared/Form";

// Table parcel
export { PaymentTableParcel } from "./parcels/PaymentTableParcel";

// Export React components for direct import (React-to-React only)
export { default as Button } from "../../shell/src/components/shared/Button";
export type { ButtonProps } from "../../shell/src/components/shared/Button";

export { default as VerticalStepper } from "../../shell/src/components/shared/VerticalStepper";
export type {
  VerticalStepperProps,
  StepItem,
} from "../../shell/src/components/shared/VerticalStepper";
export { default as NestedVerticalSteps } from "../../shell/src/components/shared/NestedVerticalSteps";
export type {
  NestedVerticalStepsProps,
  NestedStep,
} from "../../shell/src/components/shared/NestedVerticalSteps";
export { default as NavigationButtons } from "../../shell/src/components/shared/NavigationButtons";
export type { NavigationButtonsProps } from "../../shell/src/components/shared/NavigationButtons";

// Form components
export { default as FormLabel } from "../../shell/src/components/shared/FormLabel";
export type { FormLabelProps } from "../../shell/src/components/shared/FormLabel";
export { default as FormInput } from "../../shell/src/components/shared/FormInput";
export type { FormInputProps } from "../../shell/src/components/shared/FormInput";
export { default as FormSelect } from "../../shell/src/components/shared/FormSelect";
export type {
  FormSelectProps,
  SelectOption,
} from "../../shell/src/components/shared/FormSelect";

// Table component
export { default as PaymentTable } from "../../shell/src/components/shared/PaymentTable";
export type {
  PaymentTableProps,
  PaymentRecord,
  PaymentStatus,
} from "../../shell/src/components/shared/PaymentTable";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return <div>Something went wrong: {err.message}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
