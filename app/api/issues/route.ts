import authOptions from "@/app/auth/AuthOptions";
import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest){

    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({"error": "Not authenticated"}, {"status":401});

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