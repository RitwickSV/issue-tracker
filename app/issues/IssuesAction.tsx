import Link from "next/link";
import React from "react";

const IssuesAction = () => {
  return (
    <div>
      <button className="btn btn-secondary">
        <Link href="/issues/new">Add Issue</Link>
      </button>
    </div>
  );
};

export default IssuesAction;
