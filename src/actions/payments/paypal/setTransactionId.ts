'use server'

import prisma from "@/libs/prisma"



export const setTransactionId = async (orderId: string, transactionId: string) => {


  try {

    const orderUpdated = await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        transactionId: transactionId
      }
    })

    if (!orderUpdated) {

      return {
        ok: false,
        message: `No se encontró una orden con el id ${orderId}`
      }
    }

    return {
      ok: true,
    }


  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'No se pudo agregar el id de la transaction'
    }
  }



}