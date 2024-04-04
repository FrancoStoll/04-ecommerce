'use server'

import { auth } from "@/auth.config";
import prisma from "@/libs/prisma";


interface PaginatedOptions {
  page?: number,
  take?: number,
}

export const getPaginatedUsers = async ({ page = 1, take = 1 }: PaginatedOptions) => {

  const session = await auth();
  
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador'
    }
  }

  const users = await prisma.user.findMany({
    skip: (page - 1) * take,
    take: take,
    orderBy: {
      name: 'desc'
    }
  })

  const totalCount = await prisma.user.count({
    orderBy: {
      name: 'desc'
    }
  })

  const totalPages = Math.ceil(totalCount / take)


  return {
    ok: true,
    users: users,
    totalPages: totalPages,
  }

}