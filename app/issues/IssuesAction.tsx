import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const IssuesAction = () => {
  return (
    <div>
      <Link className="btn btn-secondary" href="/issues/new">
        <Button>
          <BsFillPlusCircleFill />
          Add Issue
        </Button>
      </Link>
    </div>
  );
};

export default IssuesAction;
