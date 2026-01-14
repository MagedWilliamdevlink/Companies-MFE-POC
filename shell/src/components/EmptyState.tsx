interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  title,
  message,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl p-12 text-center">
      {icon && (
        <div className="flex justify-center mb-4 text-gray-300">{icon}</div>
      )}

      {!icon && (
        <div className="flex justify-center mb-4">
          <svg
            className="w-24 h-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>

      {message && <p className="text-gray-500 mb-6">{message}</p>}

      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
