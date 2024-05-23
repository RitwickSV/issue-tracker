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
      <Link className="btn btn-secondary" href={`/issues/${issueId}/edit`}>
        <BsPencilSquare /> Edit Issue
      </Link>
    </div>
  );
};

export default EditButton;
