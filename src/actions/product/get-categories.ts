'use server'
import prisma from "@/libs/prisma"


export const getCategories = async () => {

  try {

    const categoriesDB = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return categoriesDB
  } catch (error) {
    console.log(error)
    return [];
  }
}