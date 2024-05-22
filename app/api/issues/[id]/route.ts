import authOptions from "@/app/auth/AuthOptions";
import { createIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params : {id : string}
}
export async function PATCH(request: NextRequest, {params}:Props){

    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({"error": "Not authenticated"}, {"status":401});

    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.format(), {status : 400});

    const issue = await prisma.issue.findUnique({
        where: {id : parseInt(params.id)}
    })

    if(!issue) return NextResponse.json({error : 'Issue not found'},{status : 404});

    const updatedIssue = await prisma.issue.update({
        where : {id : parseInt(params.id)},
        data : {
            title : body.title,
            description: body.description,
            status: body.status
        }
    })

    return NextResponse.json(updatedIssue,{status : 200});
}

export async function DELETE(request: NextRequest, {params}:Props){

    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({"error": "Not authenticated"}, {"status":401});

    const issue = await prisma.issue.findUnique({
        where: {id : parseInt(params.id)}
    })

    if(!issue) return NextResponse.json({error : 'Issue not found'},{status : 404});

    await prisma.issue.delete({where : {id : parseInt(params.id)}})

    return NextResponse.json({},{status : 200});
}