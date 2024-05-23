import prisma from "@/prisma/client";

import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import IssuesAction from "./IssuesAction";
import delay from "delay";
import { Box, Flex, Table } from "@radix-ui/themes";
import Link from "../components/Link";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(500);
  return (
    <Flex direction="column" gap="5">
      <IssuesAction />

      <Table.Root variant="surface">
        <Table.Header className="text-lg">
          <Table.Row>
            <Table.ColumnHeaderCell className="w-1/4">
              Issue
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="w-1/4 hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="w-1/4 hidden md:table-cell">
              Created On
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="w-1/4 hidden md:table-cell">
              Updated On
            </Table.ColumnHeaderCell>
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
    </Flex>
  );
};

export default IssuesPage;
