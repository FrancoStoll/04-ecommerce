'use server'

import { auth } from "@/auth.config"
import prisma from "@/libs/prisma";

interface PaginatedOptions {
  page?: number,
  take?: number,
}

export const getPaginatedOrders = async ({ page = 1, take = 2 }: PaginatedOptions) => {

  const session = await auth();

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    skip: (page - 1) * take,
    take: take


  })

  return {
    ok: true,
    orders: orders,
    totalPages: 2
  }

}