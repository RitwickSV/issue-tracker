"use client";
import ErrorComponent from "@/app/components/ErrorComponent";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Button, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormType = z.infer<typeof createIssueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);

          try {
            setSubmitting(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
          } catch (error) {
            setSubmitting(false);
            setError("An unexpected error occurred");
          }
        })}
        className="space-y-5 max-w-lg"
      >
        <TextField.Root
          placeholder="Title"
          type="text"
          className="w-full max-w-lg rounded-xl p-5"
          defaultValue={issue?.title}
          {...register("title")}
        />

        <ErrorComponent>{errors.title?.message}</ErrorComponent>

        <Controller
          name="status"
          control={control}
          defaultValue={issue?.status}
          render={({ field }) => (
            <Select.Root onValueChange={field.onChange}>
              <Select.Trigger placeholder="Status" />
              <Select.Content>
                <Select.Item value={Status.OPEN}>Open</Select.Item>
                <Select.Item value={Status.IN_PROGRESS}>
                  In Progress
                </Select.Item>
                <Select.Item value={Status.CLOSED}>Closed</Select.Item>
              </Select.Content>
            </Select.Root>
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              className="w-full max-w-lg rounded-2xl"
              placeholder="Description"
              {...field}
            />
          )}
        />

        <ErrorComponent>{errors.description?.message}</ErrorComponent>
        {error && <span>{error}</span>}

        <Button disabled={isSubmitting}>
          {issue ? "Edit Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
