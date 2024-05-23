import { axiosInstance } from "@/app/client";
import axios from "axios"

interface Props {
    issueId : number;
    userId : string;
}

export const updateUser = ({issueId, userId} : Props) => {
    console.log(issueId);
    console.log(userId);
    const content = axiosInstance.patch("/api/issues/"+issueId,{assignedUserId: userId})
    // const content = axios.get("/api/issues/").then(res => res.data)
    console.log(content)
}