'use client'
import { useEffect, useState } from "react"

import { QuantitySelector } from "@/components"
import { useCartStore } from "@/store"
import Image from "next/image"
import Link from "next/link"



export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProduct = useCartStore(state => state.removeProduct)
  useEffect(() => {
    setLoaded(true)
  }, [])


  if (!loaded) {
    return <p>Loading....</p>
  }

  return (
    <>
      {
        productsInCart.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
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
              <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
                <p>{product.size} - {product.title}</p>
              </Link>
              <p>{product.price}</p>
              <QuantitySelector quantity={product.quantity} onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
              />

              <button className="undeline mt-3" onClick={() => removeProduct(product)}>Remover</button>
            </div>
          </div>
        ))
      }
    </>
  )
}
