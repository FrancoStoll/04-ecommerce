/* eslint-disable react/no-unescaped-entities */
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

interface Props {
  params: {
    id: string;
  }
}

export default function OrderPage({ params }: Props) {

  const { id } = params

  // Todo: verificar
  // redirect(/)


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex items-center rounded py-2 px-3.5 font bold text-white mb-5",
                {
                  'bg-red-500': false,
                  'bg-green-700': true,
                }
              )
            }>
              <IoCartOutline size={30} />
              <span className="mx-2">Pagado</span>
            </div>

            {/* Items */}

            {
              productsInCart.map(product => (
                <div key={product.slug} className="flex mb-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    width={100}
                    height={100}
                    alt={product.title}
                    className="mr-5 rounded"
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                  />
                  <div>
                    <p>{product.title}</p>
                    <p>{product.price} x 3</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  </div>
                </div>
              ))
            }
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Franco Stoll</p>
              <p>Av. Siempre Viva 123</p>
              <p>Centro</p>
              <p>Mitre</p>
              <p>Entre Rios</p>
              <p>CP: 3180</p>
              <p>3454473489</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl text-right mt-5">$ 100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div className={
                clsx(
                  "flex items-center rounded py-2 px-3.5 font bold text-white mb-5",
                  {
                    'bg-red-500': false,
                    'bg-green-700': true,
                  }
                )
              }>
                <IoCartOutline size={30} />
                <span className="mx-2">Pagado</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}