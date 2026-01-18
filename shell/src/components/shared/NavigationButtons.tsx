import React from "react";

export interface NavigationButtonsProps {
  // Next button
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  nextHidden?: boolean;

  // Previous button
  onPrevious?: () => void;
  previousLabel?: string;
  previousDisabled?: boolean;
  previousHidden?: boolean;

  // Back to services link
  onBackToServices?: () => void;
  backToServicesLabel?: string;
  backToServicesHidden?: boolean;
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    display: "flex",
    width: "100%",
    direction: "rtl",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  container: {
    display: "flex",
    justifyContent: "flex-end",
  },
  buttonsGroup: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  nextButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1c4c9f",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  nextButtonDisabled: {
    backgroundColor: "#a0c4ff",
    cursor: "not-allowed",
  },
  previousButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "2px solid #d9d9d9",
    backgroundColor: "#ffffff",
    color: "#595959",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  previousButtonDisabled: {
    borderColor: "#e8e8e8",
    color: "#bfbfbf",
    cursor: "not-allowed",
  },
  backLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "none",
    border: "none",
    color: "#595959",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "'Cairo', 'Helvetica Neue', sans-serif",
    cursor: "pointer",
    transition: "color 0.2s ease",
  },
};

// Arrow icons
const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function NavigationButtons({
  // Next button props
  onNext,
  nextLabel = "التالي",
  nextDisabled = false,
  nextHidden = false,

  // Previous button props
  onPrevious,
  previousLabel = "الرجوع",
  previousDisabled = false,
  previousHidden = false,

  // Back to services props
  onBackToServices,
  backToServicesLabel = "الرجوع إلى الخدمات",
  backToServicesHidden = false,
}: NavigationButtonsProps) {
  const [nextHovered, setNextHovered] = React.useState(false);
  const [prevHovered, setPrevHovered] = React.useState(false);

  return (
    <div style={styles.wrapper}>
      {/* Blue accent bar on the left (appears on left in RTL) */}
      <div />

      <div style={styles.container}>
        {/* Left side - Navigation buttons (appears on left in RTL) */}
        <div style={styles.buttonsGroup}>
          {/* Right side - Back to services link */}
          {!backToServicesHidden && (
            <button onClick={onBackToServices} style={styles.backLink}>
              <ArrowRight />
              <span>{backToServicesLabel}</span>
            </button>
          )}
          {/* Previous Button (الرجوع) */}
          {!previousHidden && (
            <button
              onClick={onPrevious}
              disabled={previousDisabled}
              onMouseEnter={() => setPrevHovered(true)}
              onMouseLeave={() => setPrevHovered(false)}
              style={{
                ...styles.previousButton,
                ...(previousDisabled ? styles.previousButtonDisabled : {}),
                ...(prevHovered && !previousDisabled
                  ? { borderColor: "#1890ff", color: "#1890ff" }
                  : {}),
              }}
            >
              <ArrowRight />
              <span>{previousLabel}</span>
            </button>
          )}
          {/* Next Button (التالي) */}
          {!nextHidden && (
            <button
              onClick={onNext}
              disabled={nextDisabled}
              onMouseEnter={() => setNextHovered(true)}
              onMouseLeave={() => setNextHovered(false)}
              style={{
                ...styles.nextButton,
                ...(nextDisabled ? styles.nextButtonDisabled : {}),
                ...(nextHovered && !nextDisabled
                  ? { backgroundColor: "#163d80" }
                  : {}),
              }}
            >
              <ArrowLeft />
              <span>{nextLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
