"use client";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { UsersList } from "./GetListOfUsers";
import { updateUser } from "./UpdateUser";
import { Select } from "@radix-ui/themes";

const SelectUser = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = UsersList();

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedUserId || "unassigned"}
        onValueChange={(userId) => {
          axios.patch("/api/issues/" + issue.id, {
            assignedUserId: userId === "unassigned" ? null : userId,
          });
        }}
      >
        <Select.Trigger placeholder="Assign a User..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassign</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SelectUser;
