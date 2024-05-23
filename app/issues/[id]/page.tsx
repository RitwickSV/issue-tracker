import authOptions from "@/app/auth/AuthOptions";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import Modal from "../_components/DeleteModal";
import { Issue } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SelectUser from "./SelectUser";

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
            <SelectUser />
          </div>
          <div>
            <EditButton issueId={issue.id} />
          </div>
          <div>
            <DeleteButton params={params} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailPage;
