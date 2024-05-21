import { Status } from "@prisma/client";
import React from "react";

interface Props {
  status: Status;
}

const badgeColors: Record<
  Status,
  { label: string; color: "badge-accent" | "badge-primary" | "badge-secondary" }
> = {
  OPEN: { label: "Open", color: "badge-accent" },
  IN_PROGRESS: { label: "In Progress", color: "badge-secondary" },
  CLOSED: { label: "Closed", color: "badge-primary" },
};

const IssueStatusBadge = ({ status }: Props) => {
  let className = "badge badge-outline " + badgeColors[status].color;
  return <div className={className}>{badgeColors[status].label}</div>;
};

export default IssueStatusBadge;
