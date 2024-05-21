"use client";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorComponent from "@/app/components/ErrorComponent";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

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
        className="flex-col space-y-2 max-w-lg"
      >
        <div>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-lg rounded-xl"
            defaultValue={issue?.title}
            {...register("title")}
          />
        </div>
        <ErrorComponent>{errors.title?.message}</ErrorComponent>
        <div>
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
        </div>
        <ErrorComponent>{errors.description?.message}</ErrorComponent>
        {error && (
          <div
            role="alert"
            className="alert alert-error rounded-xl animate-shake"
          >
            <span>{error}</span>
          </div>
        )}

        <button disabled={isSubmitting} className="btn btn-primary rounded-lg">
          {issue ? "Edit Issue" : "Submit New Issue"}{" "}
          {isSubmitting && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default IssueForm;
