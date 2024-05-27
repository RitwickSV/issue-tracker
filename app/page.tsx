import Image from "next/image";
import LatestBugs from "./LatestBugs";
import IssuesSummary from "./IssuesSummary";
import IssuesCharts from "./IssuesCharts";
import { Flex, Grid } from "@radix-ui/themes";
import prisma from "@/prisma/client";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssuesCharts open={open} closed={closed} in_progress={in_progress} />
        <IssuesSummary open={open} closed={closed} in_progress={in_progress} />
      </Flex>
      <LatestBugs />
    </Grid>
  );
}
