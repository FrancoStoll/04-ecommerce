'use server'

import { Address } from "@/interfaces"
import prisma from "@/libs/prisma"



export const setUserAddress = async (address: Address, userId: string) => {


  try {
    const newAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      address: newAddress
    }

  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    }
  }

}


const createOrReplaceAddress = async (address: Address, userId: string) => {


  try {

    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId
      }
    })
    const addressToSave = {
      address: address.address,
      countryId: address.country,
      address2: address.address2,
      firstName: address.firstName,
      lastName: address.lastName,
      city: address.city,
      phone: address.postalCode,
      postalCode: address.postalCode,
      userId: userId,
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId: userId
      },
      data: addressToSave
    })

    return updatedAddress

  } catch (error) {
    console.log(error)
    throw new Error('No se pudo grabar la dirección')
  }

}

