import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest){
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.format(), {"status":500});

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
            status: body.status
        }
    });
    return NextResponse.json(newIssue, {"status":201});
}