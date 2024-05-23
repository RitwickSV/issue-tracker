"use client";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const SelectUser = async () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
  });

  return (
    <div>
      <select className="select select-bordered prose">
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
