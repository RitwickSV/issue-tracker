import { Box, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = () => {
  return (
    <>
      <Box className="space-y-5 max-w-lg">
        <Skeleton className="h-8" />
        <Skeleton className="h-8 w-1/5" />
        <Skeleton height="375px" className="w-full" />
      </Box>
    </>
  );
};

export default IssueFormSkeleton;
