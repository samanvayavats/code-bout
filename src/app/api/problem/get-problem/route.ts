import prisma from "@/src/lib/prisma";
import { NextRequest  , NextResponse} from "next/server";

export async function GET(request : NextRequest , response : NextResponse){
    try {

        const body = request.nextUrl.searchParams;
        console.log("body : ",body)
        const problemId = body.get("problemId") as string
    console.log('problemId : ' , problemId)
        const problem = await prisma.problem.findUnique({
            where :{
                id : problemId
            },
            include:{
                TestCases: true
            }
        })
    
        if(!problem){
            return NextResponse.json({
                message:"problem not found"
            },{status:404})
        }

        return NextResponse.json({
            message :"problem found",
            problem:problem
        },{status:201})
    
    } catch (error) {
        console.log("the error at the time of fetching the problem" , error);
            return NextResponse.json({
                message:"problem not found || something not found"
            },{status:500})
        }
}