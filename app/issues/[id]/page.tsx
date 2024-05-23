import authOptions from "@/app/auth/AuthOptions";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SelectUser from "./SelectUser";
import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(2000);
  if (!issue) return notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: "1", md: "5" }}>
      <Box className="col-span-4">
        <h1>{issue.title}</h1>
        <Flex className="space-x-3 items-center p-2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="shadow-2xl p-5 bg-gray-50 prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      {session && (
        <Flex direction="column" className="space-y-5 mt-3 p-5">
          <SelectUser issue={issue} />

          <div>
            <EditButton issueId={issue.id} />
          </div>
          <div>
            <DeleteButton issueId={issue.id} />
          </div>
        </Flex>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
