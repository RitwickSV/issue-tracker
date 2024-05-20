"use client";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  return (
    <>
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
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
            {...register("title")}
          />
        </div>
        {errors.title && (
          <div
            role="alert"
            className="alert alert-error rounded-xl animate-shake"
          >
            {errors.title.message}
          </div>
        )}
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                className="w-full max-w-lg rounded-2xl"
                placeholder="Description"
                {...field}
              />
            )}
          />
        </div>
        {errors.description && (
          <div
            role="alert"
            className="alert alert-error rounded-xl animate-shake"
          >
            {errors.description.message}
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="alert alert-error rounded-xl animate-shake"
          >
            <span>{error}</span>
          </div>
        )}

        <button className="btn btn-primary rounded-lg">Add new Issue</button>
      </form>
    </>
  );
};

export default NewIssue;
