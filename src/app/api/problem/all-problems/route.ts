import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if(!session){
    //     return NextResponse.json({
    //         message :"Invaild User "
    //     },{status : 401})
    // }

    const problems = await prisma.problem.findMany()

    if (!problems) {
      return NextResponse.json(
        {
          message: 'no problem available',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'all the problems fetched',
        problems: problems,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('the error at the time fetching the problem is : ', error)
    return NextResponse.json(
      {
        message: 'no problem available',
      },
      { status: 500 }
    )
  }
}
