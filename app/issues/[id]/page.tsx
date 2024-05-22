import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import Modal from "../_components/DeleteModal";
import axios from "axios";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) return notFound();

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
      <div className="flex-col space-y-3 mt-3 p-5">
        <div>
          <button className="btn btn-secondary">
            <BsPencilSquare />
            <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
          </button>
        </div>
        <div>
          <button className="btn btn-accent">
            <BsTrash />
            <Link href="?modal=true">Delete Issue</Link>
          </button>
          <Modal params={params} />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPage;
