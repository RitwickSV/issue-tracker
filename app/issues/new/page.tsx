"use client";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
      className="flex-col space-y-2"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full max-w-lg rounded-xl"
          {...register("title")}
        />
      </div>
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
      <button className="btn btn-primary rounded-lg">Add new Issue</button>
    </form>
  );
};

export default NewIssue;
