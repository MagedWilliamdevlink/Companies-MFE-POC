import React, { useState } from "react";
import Parcel from "single-spa-react/parcel";
import { mountRootParcel } from "single-spa";
import { ServicePageLayoutParcel } from "./shared-ui";

// ==========================================
// DATA ONLY - service-a controls the logic
// ==========================================

// Steps configuration
const steps = [
  { title: "الخطوة الأولى" },
  { title: "الخطوة الثانية" },
  { title: "الخطوة الثالثة" },
  { title: "الدفع الالكتروني" },
  { title: "الخطوة الخامسة" },
];

// Fee items for step 4 (payment step)
const feeItems = [
  { label: "قيمة رسم السجل التجاري", price: 200 },
  { label: "رسوم نقابة التجاريين", price: 200 },
  { label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة", price: 300 },
  { label: "قيمة رسم الاتحاد العام للغرف", price: 250 },
  { label: "قيمة رسم التوثيق", price: 400 },
];

// Step configurations - service-a controls what renders at each step
const stepConfigs = {
  1: {
    title: "بيانات الشركة",
    subtitle: "يرجى إدخال بيانات الشركة",
    contentComponent: null,
    contentProps: {},
  },
  2: {
    title: "بيانات المؤسسين",
    subtitle: "يرجى إدخال بيانات المؤسسين",
    contentComponent: null,
    contentProps: {},
  },
  3: {
    title: "مراجعة البيانات",
    subtitle: "يرجى مراجعة البيانات قبل الإرسال",
    contentComponent: null,
    contentProps: {},
  },
  4: {
    title: "دفع رسوم العقد",
    subtitle: "من فضلك قم بدفع الرسوم المطلوبة لأتمام عملية الأستخراج",
    contentComponent: "FeeSummary" as const,
    contentProps: {
      items: feeItems,
      expiryDate: "20/6/2025",
      paymentTime: "19:55:00",
    },
  },
  5: {
    title: "تم الإرسال",
    subtitle: "تم إرسال الطلب بنجاح",
    contentComponent: null,
    contentProps: {},
  },
};

const TOTAL_STEPS = 5;

export default function Root() {
  // Service-a controls current step with state
  const [currentStep, setCurrentStep] = useState(4);

  const currentConfig = stepConfigs[currentStep as keyof typeof stepConfigs];

  // ==========================================
  // Navigation handlers - service-a controls!
  // ==========================================
  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToServices = () => {
    // Navigate back to services page
    alert("Navigating back to services...");
    // window.location.href = '/services';
  };

  const handlePayment = () => {
    alert("Payment successful!");
    handleNext(); // Move to next step after payment
  };

  // ==========================================
  // Navigation config - service-a controls visibility/disabled state!
  // ==========================================
  const navigationConfig = {
    // Next button
    onNext: handleNext,
    nextLabel: "التالي",
    nextDisabled: currentStep === TOTAL_STEPS, // Disabled on last step
    nextHidden: currentStep === TOTAL_STEPS, // Hidden on last step (optional)

    // Previous button
    onPrevious: handlePrevious,
    previousLabel: "الرجوع",
    previousDisabled: currentStep === 1, // Disabled on first step
    previousHidden: false,

    // Back to services link
    onBackToServices: handleBackToServices,
    backToServicesLabel: "الرجوع إلى الخدمات",
    backToServicesHidden: false,
  };

  return (
    <Parcel
      config={ServicePageLayoutParcel}
      mountParcel={mountRootParcel}
      // Stepper props
      stepperHeaderTitle="الهلال للاستثمار والتنمية العمرانية"
      stepperHeaderDescription="خدمة التصديق على محاضر الجمعيات العامة ومجالس الإدارة"
      steps={steps}
      currentStep={currentStep - 1} // 0-indexed for stepper
      // Page header
      currentStepNumber={currentStep}
      totalSteps={TOTAL_STEPS}
      stepTitle={currentConfig.title}
      stepSubtitle={currentConfig.subtitle}
      // Content component
      contentComponent={currentConfig.contentComponent}
      contentProps={{
        ...currentConfig.contentProps,
        onPayment: handlePayment,
      }}
      // Navigation - service-a controls everything!
      navigation={navigationConfig}
    />
  );
}
