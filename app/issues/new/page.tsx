import React from "react";

const NewIssue = () => {
  return (
    <div className="flex-col space-y-2">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full max-w-lg"
        />
      </div>
      <div>
        <textarea
          className="textarea textarea-bordered w-full max-w-lg"
          placeholder="Description"
        />
      </div>
      <button className="btn btn-primary">Add new Issue</button>
    </div>
  );
};

export default NewIssue;
