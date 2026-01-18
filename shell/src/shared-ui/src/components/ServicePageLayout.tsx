// import React from "react";
// import VerticalStepper, { StepItem } from "./VerticalStepper";
// import FeeSummary, { FeeItem } from "./FeeSummary";
// import NavigationButtons, { NavigationButtonsProps } from "./NavigationButtons";

// // Registry of available content components
// const componentRegistry = {
//   FeeSummary: FeeSummary,
//   // Add more components here as needed
//   // FormStep: FormStep,
//   // ConfirmationStep: ConfirmationStep,
// } as const;

// export type ContentComponentType = keyof typeof componentRegistry;

// // Props types for each registered component
// export interface ContentPropsMap {
//   FeeSummary: {
//     items: FeeItem[];
//     expiryDate?: string;
//     paymentTime?: string;
//     onPayment?: () => void;
//   };
//   // Add more as needed
// }

// export interface ServicePageLayoutProps {
//   // Stepper props
//   stepperHeaderTitle?: string;
//   stepperHeaderDescription?: string;
//   steps?: StepItem[];
//   currentStep?: number;
//   onStepChange?: (step: number) => void;

//   // Page header
//   currentStepNumber?: number;
//   totalSteps?: number;
//   stepTitle?: string;
//   stepSubtitle?: string;

//   // Content component selection - service-a controls this!
//   contentComponent?: ContentComponentType;
//   contentProps?: ContentPropsMap[ContentComponentType];

//   // Navigation buttons - service-a controls visibility and actions!
//   navigation?: NavigationButtonsProps;

//   // Or use children for custom content
//   children?: React.ReactNode;
// }

// const styles: Record<string, React.CSSProperties> = {
//   wrapper: {
//     display: "flex",
//     direction: "rtl",
//     fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
//     backgroundColor: "#f5f7fa",
//     height: "100%",
//     minHeight: "100%",
//   },
//   sidebar: {
//     width: "25%",
//     backgroundColor: "#ffffff",
//     borderLeft: "1px solid #e8e8e8",
//     padding: "32px 24px",
//     flexShrink: 0,
//     minHeight: "70vh",
//     // minHeight: "80vh",
//     marginBottom: "100px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   mainWrapper: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#f5f7fa",
//   },
//   mainContent: {
//     flex: 1,
//     padding: "32px 48px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start", // RTL: align to right
//   },
//   contentHeader: {
//     textAlign: "right", // RTL alignment
//     marginBottom: "32px",
//     width: "100%",
//     maxWidth: "500px",
//   },
//   stepIndicator: {
//     fontSize: "14px",
//     color: "#1890ff", // Blue color like in image
//     fontWeight: 500,
//     margin: "0 0 8px 0",
//   },
//   stepTitle: {
//     fontSize: "24px",
//     fontWeight: 700,
//     color: "#1a1a2e",
//     margin: "8px 0",
//   },
//   stepSubtitle: {
//     fontSize: "14px",
//     color: "#8c8c8c",
//     margin: 0,
//   },
//   contentBody: {
//     width: "100%",
//     // maxWidth: "500px",
//     display: "flex",
//     justifyContent: "flex-start", // RTL: align content to right
//     flex: 1,
//     flexDirection: "column",
//   },
// };

// export default function ServicePageLayout({
//   // Stepper props
//   stepperHeaderTitle,
//   stepperHeaderDescription,
//   steps,
//   currentStep = 0,
//   onStepChange,

//   // Page header
//   currentStepNumber,
//   totalSteps,
//   stepTitle,
//   stepSubtitle,

//   // Content component - service-a controls what to render!
//   contentComponent,
//   contentProps,

//   // Navigation - service-a controls visibility and actions!
//   navigation,

//   // Custom content fallback
//   children,
// }: ServicePageLayoutProps) {
//   // Render the selected content component from registry
//   const renderContent = () => {
//     if (contentComponent && componentRegistry[contentComponent]) {
//       const Component = componentRegistry[contentComponent];
//       return <Component {...(contentProps as any)} />;
//     }
//     return children;
//   };

//   return (
//     <div style={styles.wrapper}>
//       {/* Sidebar with Stepper */}
//       <aside style={styles.sidebar}>
//         <VerticalStepper
//           headerTitle={stepperHeaderTitle}
//           headerDescription={stepperHeaderDescription}
//           steps={steps}
//           currentStep={currentStep}
//           onStepChange={onStepChange}
//         />
//       </aside>

//       {/* Main Content Wrapper - includes content + navigation */}
//       <div style={styles.mainWrapper}>
//         {/* Main Content */}
//         <main style={styles.mainContent}>
//           {/* Content Header */}
//           {(stepTitle || currentStepNumber) && (
//             <div style={styles.contentHeader}>
//               {currentStepNumber && totalSteps && (
//                 <p style={styles.stepIndicator}>
//                   الخطوة {currentStepNumber}/{totalSteps}
//                 </p>
//               )}
//               {stepTitle && <h1 style={styles.stepTitle}>{stepTitle}</h1>}
//               {stepSubtitle && (
//                 <p style={styles.stepSubtitle}>{stepSubtitle}</p>
//               )}
//             </div>
//           )}

//           {/* Content Body */}
//           <div style={styles.contentBody}>
//             {renderContent()}
//             <div>{navigation && <NavigationButtons {...navigation} />}</div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
