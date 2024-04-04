'use client'

import { useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export const OrderSummary = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace('/empty')
    }
  }, [itemsInCart, router, loaded])


  if (!loaded) return <p>Loading....</p>

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? '1 articulo' : `${itemsInCart} articulos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total</span>
      <span className="text-2xl text-right mt-5">{currencyFormat(total)}</span>
    </div>

  )
}
