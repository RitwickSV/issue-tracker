"use client";
import Link from "next/link";
import React from "react";
import {
  BsBackspaceFill,
  BsExclamationTriangleFill,
  BsTrash,
} from "react-icons/bs";
import Modal from "../_components/DeleteModal";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  issueId: number;
}

const DeleteButton = ({ issueId }: Props) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <BsTrash /> Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex className="mt-4 space-x-5">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
            >
              <BsExclamationTriangleFill /> Confirm{" "}
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              <BsBackspaceFill />
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
