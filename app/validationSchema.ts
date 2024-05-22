import { Status } from "@prisma/client";
import {z} from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(1, 'Title cannot be empty').max(255),
    description: z.string().min(1, 'Description cannot be empty').max(255),
    status: z.enum([Status.OPEN, Status.IN_PROGRESS, Status.CLOSED])
})