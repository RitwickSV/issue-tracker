import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { HiPencilAlt } from "react-icons/hi";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2">
      <div>
        <h1>{issue.title}</h1>
        <div className="flex space-x-3 items-center p-2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <div className="card shadow-2xl p-5 bg-gray-50 prose prose-md">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary">
          <HiPencilAlt />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </button>
      </div>
    </div>
  );
};

export default IssueDetailPage;
