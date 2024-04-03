'use server'

import { auth } from "@/auth.config";
import prisma from "@/libs/prisma"


export const getOrderById = async (id: string) => {

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: id
      }
    })



    const address = await prisma.orderAddress.findFirst({
      where: {
        orderId: order?.id
      }
    })

    const items = await prisma.orderItem.findMany({
      where: {
        orderId: order?.id
      },
      select: {
        price: true,
        quantity: true,
        size: true,
        product: {
          select: {
            title: true,
            slug: true,
            ProductImage: {
              select: {
                url: true
              },
              take: 1
            }
          }
        }

      }


    })
    if (!order) throw `${id} no existe esta orden`
    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `${id} no es de ese usuario`
      }
    }

    return {
      ok: true,
      order: order,
      address: address,
      items: items,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Orden no existe'
    }
  }


}