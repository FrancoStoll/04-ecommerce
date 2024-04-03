import { getOrderById } from "@/actions";
import { OrderSatus, PaypalButton, Title } from "@/components";


import { currencyFormat } from "@/utils";
import clsx from "clsx";

import Image from "next/image";

import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";



interface Props {
  params: {
    id: string;
  }
}

export default async function OrderPage({ params }: Props) {

  const { id } = params

  const { order, address, items, ok } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderSatus isPaid={order?.isPaid ?? false} />

            {/* Items */}

            {
              items?.map(product => (
                <div key={product.product.slug + '-' + product.size} className="flex mb-5">
                  <Image
                    src={`/products/${product.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    alt={product.product.title}
                    className="mr-5 rounded"
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                  />
                  <div>
                    <p>{product.size} - {product.product.title}</p>
                    <p>{product.price} x {product.quantity}</p>
                    <p className="font-bold">Subtotal: ${product.price * product.quantity}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{address?.firstName + ' ' + address?.lastName}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>CP: {address?.postalCode}</p>
              <p>{address?.city}, {address?.countryId}</p>
              <p>{address?.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{`${order?.itemsInOrder} - ${order?.itemsInOrder === 1 ? 'artículo' : 'artículos'}`}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl text-right mt-5">{currencyFormat(order!.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">

              {
                order?.isPaid
                  ? (
                    <OrderSatus isPaid={order?.isPaid} />
                  )
                  : (
                    <PaypalButton orderId={order!.id} amount={order!.total} />
                  )
              }

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}