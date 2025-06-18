import { NextResponse, type NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

// 获取所有用户
export async function GET() {
  try {
    const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      isAdmin: true,
      createdAt: true
    }
  })
    return NextResponse.json(users)
  } catch {
    return NextResponse.json({ error: '获取用户失败' }, { status: 500 })
  }
}

// 创建新用户
export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({ data: { email, name, password: hashedPassword } })
    return NextResponse.json(user, { status: 201 })
  } catch {
    return NextResponse.json({ error: '创建用户失败' }, { status: 400 })
  }
}

// 更新用户
export async function PUT(request: NextRequest) {
  try {
    const { id, email, name } = await request.json()
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, name }
    })
    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: '用户不存在或更新失败' }, { status: 404 })
  }
}

// 删除用户
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const idStr = pathname.split('/').pop();
    if (!idStr || isNaN(Number(idStr))) {
      return NextResponse.json({ error: '无效的用户ID' }, { status: 400 });
    }
    const id = Number(idStr);
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: '用户删除成功' });
  } catch {
    return NextResponse.json({ error: '用户不存在或删除失败' }, { status: 404 });
  }
}