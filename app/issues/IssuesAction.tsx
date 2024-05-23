import Link from "next/link";
import React from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";

const IssuesAction = () => {
  return (
    <div>
      <Link className="btn btn-secondary" href="/issues/new">
        <BsFillPlusCircleFill />
        Add Issue
      </Link>
    </div>
  );
};

export default IssuesAction;
