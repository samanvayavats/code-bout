import prisma from '@/src/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        wins: 'desc',
      },
      select: {
        id: true,
        name: true,
        wins: true,
        losses: true,
      },
    })

    if (!users) {
      return NextResponse.json(
        {
          message: 'no user exits',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'users fetched success',
        users,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('something went wrong for fecthing the users ', error)
    return NextResponse.json(
      {
        message: 'users fetched success ',
      },
      { status: 200 }
    )
  }
}
