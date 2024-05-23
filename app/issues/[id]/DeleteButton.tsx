import Link from "next/link";
import React from "react";
import { BsTrash } from "react-icons/bs";
import Modal from "../_components/DeleteModal";

interface Props {
  params: { id: string };
}

const DeleteButton = ({ params }: Props) => {
  return (
    <div>
      {" "}
      <Link className="btn btn-accent" href="?modal=true">
        <BsTrash />
        Delete Issue
      </Link>
      <Modal params={params} />
    </div>
  );
};

export default DeleteButton;
