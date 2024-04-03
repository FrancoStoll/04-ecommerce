'use server'
import prisma from "@/libs/prisma"


export const deleteUserAddress = async (userId: string) => {

  try {


    await prisma.userAddress.delete({
      where: {
        userId: userId
      }
    })

    return {
      ok: true,
      message: 'Eliminado'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo eliminar la dirección'
    }
  }
}