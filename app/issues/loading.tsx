import React from "react";
import IssuesAction from "./IssuesAction";
import { Flex, Skeleton, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";

const issues = [1, 2, 3, 4, 5];

const IssueLoadingPage = () => {
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
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton className="h-11 md:h-6" />
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="h-11 md:h-6" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="h-11 md:h-6" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="h-11 md:h-6" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default IssueLoadingPage;
