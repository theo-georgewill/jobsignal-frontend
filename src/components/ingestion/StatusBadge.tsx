import React from "react";

type Status =
  | "running"
  | "healthy"
  | "warning"
  | "failed"
  | "paused"
  | "completed";

interface Props {
  status: Status;
}

const styles = {
  running: "bg-blue-100 text-blue-700",
  healthy: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700",
  paused: "bg-gray-100 text-gray-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}