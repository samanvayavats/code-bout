import prisma from '@/src/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt, { genSalt, genSaltSync } from 'bcrypt'
import { registerUser } from '@/src/lib/zod-validation-schema'
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { name, email, password } = await request.json()
    console.log('data', name, email, password)
    // const name = body.get('name') as string
    // const email = body.get('email') as string
    // const password = body.get('password') as string

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: 'all the fields are requird',
        },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { name: name },
    })

    if (user) {
      return NextResponse.json(
        {
          message: 'user already exits || please try to login',
        },
        { status: 401 }
      )
    }

    const hashPassword = await bcrypt.hash(password, genSaltSync(10))

    const userCreated = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    if (!userCreated) {
      return NextResponse.json(
        {
          message: 'user not created',
        },
        { status: 501 }
      )
    }

    return NextResponse.json(
      {
        message: 'the user created sucessfully ',
        userCreated,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('the error at the signup', error)
    return NextResponse.json(
      {
        message: 'user not created',
      },
      { status: 501 }
    )
  }
}
