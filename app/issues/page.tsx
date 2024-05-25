import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex, Table } from "@radix-ui/themes";
import delay from "delay";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Link from "../components/Link";
import IssuesAction from "./IssuesAction";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: status },
  });
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
