import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import NextLink from "next/link";
import React from "react";
import { BsArrowUp } from "react-icons/bs";
import IssueStatusBadge from "../components/IssueStatusBadge";
import { Issue, Status } from "@prisma/client";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
  issues: Issue[];
}

const issueColumns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  {
    label: "Created On",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
  {
    label: "Updated On",
    value: "updatedAt",
    className: "hidden md:table-cell",
  },
];

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header className="text-lg">
        <Table.Row>
          {issueColumns.map((issue) => (
            <Table.ColumnHeaderCell
              key={issue.value}
              className={`w-1/4 ${issue.className}`}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: issue.value },
                }}
              >
                {issue.label}
                {issue.value === searchParams.orderBy && (
                  <BsArrowUp className="inline" />
                )}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              {
                <span className="text-sm md:hidden">
                  <br />
                  <IssueStatusBadge status={issue.status} />
                </span>
              }
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
