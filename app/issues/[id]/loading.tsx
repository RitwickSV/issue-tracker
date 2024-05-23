import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Grid, Box, Card, Skeleton } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SelectUser from "./SelectUser";

const IssueDetailLoadingPage = () => {
  return (
    <Grid columns={{ initial: "1", md: "5" }}>
      <Box className="col-span-4">
        <h1>
          <Skeleton className="h-9" />
        </h1>
        <Skeleton className="p-5 h-5 w-1/5 mt-3" />
        <Card className="h-10 mt-4 shadow-2xl p-5 bg-gray-50 prose max-w-full">
          <Skeleton />
        </Card>
      </Box>
    </Grid>
  );
};

export default IssueDetailLoadingPage;
