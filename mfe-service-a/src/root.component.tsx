import Parcel from "single-spa-react/parcel";
import { FeeSummaryParcel } from "./shared-ui";
import { ButtonParcel } from "./shared-ui";

// Example fee items data
const feeItems = [
  { label: "قيمة رسم السجل التجاري", price: 200 },
  { label: "رسوم نقابة التجاريين", price: 200 },
  { label: "رسوم الهيئة العامة للاستثمار والأسواق الحرة", price: 300 },
  { label: "قيمة رسم الاتحاد العام للغرف", price: 250 },
  { label: "قيمة رسم التوثيق", price: 400 },
];

export default function Root(props) {
  const handlePayment = () => {
    alert("Payment button clicked!");
  };

  return (
    <section
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>{props.name} is mounted!</h2>

      {/* FeeSummary Parcel from shared-ui */}
      <Parcel
        config={FeeSummaryParcel}
        items={feeItems}
        expiryDate="20/6/2025"
        paymentTime="19:55:00"
        onPayment={handlePayment}
      />
    </section>
  );
}
