import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}

const badgeColors: Record<
  Status,
  { label: string; color: "red" | "blue" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  let className = "badge badge-outline " + badgeColors[status].color;
  // return <div className={className}></div>;
  return (
    <Badge radius="large" size="2" color={badgeColors[status].color}>
      {badgeColors[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
