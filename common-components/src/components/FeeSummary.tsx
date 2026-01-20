import React from "react";

export interface FeeItem {
  label: string;
  price: number;
}

export interface FeeSummaryProps {
  items?: FeeItem[];
  expiryDate?: string;
  paymentTime?: string;
  onPayment?: () => void;
}

// Receipt icon SVG path
const RECEIPT_ICON_PATH =
  "M4 7.8C4 6.11984 4 5.27976 4.32698 4.63803C4.6146 4.07354 5.07354 3.6146 5.63803 3.32698C6.27976 3 7.11984 3 8.8 3H15.2C16.8802 3 17.7202 3 18.362 3.32698C18.9265 3.6146 19.3854 4.07354 19.673 4.63803C20 5.27976 20 6.11984 20 7.8V21L17.25 19L14.75 21L12 19L9.25 21L6.75 19L4 21V7.8Z";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "31px",
    position: "relative",
    width: "100%",
    maxWidth: "500px",
    direction: "rtl", // RTL for Arabic
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0px 20px 40px 0px rgba(0,0,0,0.06)",
    width: "100%",
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px",
    width: "100%",
  },
  header: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    justifyContent: "flex-start", // RTL: flex-start = right
  },
  headerTitle: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "30px",
    color: "#2f3642",
    margin: 0,
  },
  divider: {
    backgroundColor: "#f2f2f2",
    height: "2px",
    borderRadius: "29px",
    width: "100%",
  },
  dividerLight: {
    backgroundColor: "#d9d9d9",
    height: "2px",
    borderRadius: "124px",
    width: "100%",
    opacity: 0.7,
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    color: "#000000",
    width: "100%",
  },
  itemLabel: {
    margin: 0,
    textAlign: "right",
  },
  itemPrice: {
    margin: 0,
    direction: "ltr", // Keep price LTR for proper number display
    textAlign: "left",
  },
  totalContainer: {
    backgroundColor: "#f2f7fe",
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 700,
    fontSize: "20px",
    color: "#2667da",
    margin: 0,
    direction: "ltr", // Keep price LTR
  },
  totalLabel: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    color: "#000000",
    margin: 0,
  },
  button: {
    cursor: "pointer",
    display: "flex",
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px 0 10px 0",
    borderRadius: "30px",
    border: "none",
    width: "100%",
    backgroundImage:
      "linear-gradient(-64.7327deg, rgb(28, 76, 159) 4.7619%, rgb(40, 94, 190) 100%)",
    transition: "opacity 0.2s ease",
  },
  buttonText: {
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 700,
    fontSize: "18px",
    color: "#ffffff",
    lineHeight: "28px",
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    width: "100%",
  },
  footerValue: {
    color: "#000000",
    margin: 0,
    direction: "ltr", // Keep values LTR for dates/times
  },
  footerLabel: {
    color: "#5e5e5e",
    margin: 0,
  },
};

function ReceiptIcon() {
  return (
    <div style={{ width: "24px", height: "24px", flexShrink: 0 }}>
      <svg
        style={{ display: "block", width: "100%", height: "100%" }}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <path
          d={RECEIPT_ICON_PATH}
          stroke="#CB9633"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export default function FeeSummary({
  items = [],
  expiryDate = "20/6/2025",
  paymentTime = "19:55:00",
  onPayment,
}: FeeSummaryProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      {/* Main Card */}
      <div style={styles.card}>
        <div style={styles.cardInner}>
          {/* Summary Section */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              width: "100%",
            }}
          >
            {/* Header - Icon then Title (RTL: icon on right) */}
            <div style={styles.header}>
              <ReceiptIcon />
              <p style={styles.headerTitle}>ملخص رسوم الخدمة</p>
            </div>

            {/* Divider */}
            <div style={styles.divider} />

            {/* Items List - Label on right, Price on left */}
            <div style={styles.itemsList}>
              {items.map((item, index) => (
                <div key={index} style={styles.itemRow}>
                  <p style={styles.itemLabel}>{item.label}</p>
                  <p style={styles.itemPrice}>{item.price} EGP</p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={styles.dividerLight} />

            {/* Total - Label on right, Amount on left */}
            <div style={styles.totalContainer}>
              <p style={styles.totalLabel}>الأجمالي</p>
              <p style={styles.totalAmount}>{total} EGP</p>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={onPayment}
            style={{
              ...styles.button,
              opacity: isHovered ? 0.9 : 1,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span style={styles.buttonText}>دفع المستحقات</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div style={styles.footer}>
        {/* Expiry Date - Label on right, Value on left */}
        <div style={styles.footerRow}>
          <p style={styles.footerLabel}>تاريخ انتهاء الصلاحية</p>
          <p style={styles.footerValue}>{expiryDate}</p>
        </div>

        {/* Payment Time - Label on right, Value on left */}
        <div style={styles.footerRow}>
          <p style={styles.footerLabel}>الدفع</p>
          <p style={styles.footerValue}>{paymentTime}</p>
        </div>
      </div>
    </div>
  );
}
