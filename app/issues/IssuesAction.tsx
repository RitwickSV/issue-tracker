import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import IssueStatusFilter from "./IssueStatusFilter";

const IssuesAction = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Link className="btn btn-secondary" href="/issues/new">
        <Button>
          <BsFillPlusCircleFill />
          Add Issue
        </Button>
      </Link>
    </Flex>
  );
};

export default IssuesAction;
