import React from "react";

type Status =
  | "running"
  | "healthy"
  | "warning"
  | "failed"
  | "paused"
  | "completed";

type Variant = "status" | "priority" | "momentum";

interface Props {
  status: string; // widened (important)
  variant?: Variant;
}

const statusStyles = {
  running: "bg-blue-100 text-blue-700",
  healthy: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  paused: "bg-gray-100 text-gray-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const priorityStyles = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-gray-100 text-gray-600",
};

const momentumStyles = {
  up: "text-green-600",
  down: "text-red-600",
  stable: "text-gray-500",
};

export default function StatusBadge({ status, variant = "status" }: Props) {
  const value = status.toLowerCase();

  // DEFAULT (existing ingestion behavior)
  if (variant === "status") {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          statusStyles[value as keyof typeof statusStyles] ??
          "bg-gray-100 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  }

  // PRIORITY
  if (variant === "priority") {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          priorityStyles[value as keyof typeof priorityStyles] ??
          priorityStyles.low
        }`}
      >
        {value.toUpperCase()}
      </span>
    );
  }

  // MOMENTUM
  if (variant === "momentum") {
    const map = {
      up: "↑ UP",
      down: "↓ DOWN",
      stable: "→ STABLE",
    };

    return (
      <span
        className={`text-xs font-medium ${
          momentumStyles[value as keyof typeof momentumStyles] ??
          momentumStyles.stable
        }`}
      >
        {map[value as keyof typeof map] ?? value}
      </span>
    );
  }

  return null;
}