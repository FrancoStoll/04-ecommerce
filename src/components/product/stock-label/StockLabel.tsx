'use client'
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}



export const StockLabel = ({ slug }: Props) => {


  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getStock();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStock = async () => {

    const inStock = await getStockBySlug(slug)

    setStock(inStock)
    setIsLoading(false);
  }

  return (
    <>
      {
        isLoading
          ? (
            <h1 className={`${titleFont.className} rounded antialiased font-bold text-md animate-pulse bg-gray-300`}>&nbsp;</h1>
          )
          : (
            <h1 className={`${titleFont.className} antialiased font-bold text-md`}>Stock: {stock}</h1>
          )
      }



    </>
  )
}
