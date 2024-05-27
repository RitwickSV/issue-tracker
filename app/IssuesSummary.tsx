import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssuesSummary = ({ open, in_progress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
    color: string;
  }[] = [
    { label: "Open Issues", value: open, status: "OPEN", color: "red" },
    { label: "Closed Issues", value: closed, status: "CLOSED", color: "green" },
    {
      label: "In Progress Issues",
      value: in_progress,
      status: "IN_PROGRESS",
      color: "blue",
    },
  ];

  return (
    <Flex gap="4">
      {statuses.map((status) => (
        <Link href={`/issues?status=${status.status}`}>
          <Card className={`bg-${status.color}-400`}>
            <Flex direction="column" gap="4">
              <Text>{status.label}</Text>
              <Text className="font-bold">{status.value}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
