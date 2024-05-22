import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Modal from "../_components/DeleteModal";
import axios from "axios";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

  const session = await getServerSession(authOptions);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-5">
      <div className="col-span-4">
        <h1>{issue.title}</h1>
        <div className="flex space-x-3 items-center p-2">
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <div className="card shadow-2xl p-5 bg-gray-50 prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </div>
      </div>
      {session && (
        <div className="flex-col space-y-3 mt-3 p-5">
          <div>
            <Link
              className="btn btn-secondary"
              href={`/issues/${issue.id}/edit`}
            >
              <BsPencilSquare /> Edit Issue
            </Link>
          </div>
          <div>
            <Link className="btn btn-accent" href="?modal=true">
              <BsTrash />
              Delete Issue
            </Link>
            <Modal params={params} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailPage;
