import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div className="flex-col space-y-5">
      <div>
        <button className="btn btn-primary">
          <Link href="/issues/new">Add Issue</Link>
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl">
        <table className="table table-auto ">
          <thead className="text-lg bg-gray-200">
            <tr>
              <td>Issue</td>
              <td className="hidden md:table-cell">Status</td>
              <td className="hidden md:table-cell">Created On</td>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>
                  {issue.title}

                  {
                    <span className="text-sm md:hidden">
                      <br />
                      <IssueStatusBadge status={issue.status} />
                    </span>
                  }
                </td>
                <td className="hidden md:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </td>
                <td className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssuesPage;
