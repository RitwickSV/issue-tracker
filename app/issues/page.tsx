import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <div>
      <button className="btn btn-primary">
        <Link href="/issues/new">Add Issue</Link>
      </button>
    </div>
  );
};

export default IssuesPage;
