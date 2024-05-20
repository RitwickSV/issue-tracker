"use client";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="flex-col space-y-2">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full max-w-lg rounded-xl"
        />
      </div>
      <div>
        <SimpleMDE
          className="w-full max-w-lg rounded-2xl"
          placeholder="Description"
        />
      </div>
      <button className="btn btn-primary rounded-lg">Add new Issue</button>
    </div>
  );
};

export default NewIssue;
