import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";

interface Props {
  issueId: number;
}

const EditButton = ({ issueId }: Props) => {
  return (
    <div>
      {" "}
      <Link href={`/issues/${issueId}/edit`}>
        <Button>
          <BsPencilSquare /> Edit Issue
        </Button>
      </Link>
    </div>
  );
};

export default EditButton;
