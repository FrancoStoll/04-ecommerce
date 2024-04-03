'use server'
import prisma from "@/libs/prisma"



export const getStockBySlug = async (slug: string) => {

  try {

    const stock = await prisma.product.findFirst({
      select: {
        inStock: true
      },
      where: {
        slug
      }
    })

    return stock?.inStock ?? 0
  } catch (error) {
    return 0
  }

}