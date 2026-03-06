interface StatusBadgeProps {
  status: "active" | "inactive";
}

const statusConfig = {
  active: {
    bg: "bg-green-50",
    text: "text-green-700",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M10.28 2.28a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0L1.72 6.34a.75.75 0 1 1 1.06-1.06L4.97 7.47l4.72-4.72a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
  },
  inactive: {
    bg: "bg-red-50",
    text: "text-red-700",
    icon: (
      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M3.28 3.28a.75.75 0 0 1 1.06 0L6 4.94l1.66-1.66a.75.75 0 1 1 1.06 1.06L7.06 6l1.66 1.66a.75.75 0 1 1-1.06 1.06L6 7.06 4.34 8.72a.75.75 0 0 1-1.06-1.06L4.94 6 3.28 4.34a.75.75 0 0 1 0-1.06Z" />
      </svg>
    ),
  },
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${config.bg} ${config.text}`}
    >
      {config.icon}
      {status}
    </span>
  );
}
