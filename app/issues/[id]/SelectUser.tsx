"use client";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { UsersList } from "./GetListOfUsers";
import { updateUser } from "./UpdateUser";

const SelectUser = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = UsersList();

  return (
    <div>
      <select
        defaultValue={issue.assignedUserId || ""}
        onChange={(e) =>
          updateUser({ issueId: issue.id, userId: e.target.value })
        }
        className="select select-bordered prose"
      >
        <option hidden>Choose User</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUser;
