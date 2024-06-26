'use client'

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"




export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errrorMessage, setErrrorMessage] = useState('')
  const { itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())
  const address = useAddressStore(state => state.address);


  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)



  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {

    setIsPlacingOrder(true);

    const productsToOrder = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size
    }))



    //! Server action
    const resp = await placeOrder(productsToOrder, address)
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrrorMessage(resp.message);
      return;
    }

    // ? Todo salio bien
    clearCart();

    router.replace(`/orders/${resp.order}`);

  }


  if (!loaded) {
    return <p>Loading...</p>
  }


  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName + ' ' + address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>CP: {address.postalCode}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-xl mb-2">Resumen de orden</h2>

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

      <div className="mt-5 mb-2 w-full">

        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">Al hacer click en  &quot;Colocar orden&ldquo;, aceptas nuestros <a className="underline" href="#">terminos y condiciones</a></span>
        </p>

        <p className="text-red-500">{errrorMessage}</p>

        <button
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }>
          Confirmar orden
        </button>
      </div>
    </div>
  )
}