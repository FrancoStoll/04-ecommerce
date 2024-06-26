import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";





interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: VoidFunction;
}

export const useCartStore = create<State>()(

  persist(
    (set, get) => ({

      cart: [],

      // Methods

      getTotalItems: () => {
        const { cart } = get();

        return cart.reduce((total, item) => total + item.quantity, 0)

      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada

        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        );

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        // 2. Se que el producto existe por talla.. Increment

        const updateCartProduct = cart.map((item) => {

          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }

          return item
        })
        set({ cart: updateCartProduct });

      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updateCartQuantity = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {

            return { ...item, quantity: quantity }
          }
          return item
        })

        set({ cart: updateCartQuantity });

      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProductsRemove = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        )

        set({ cart: updatedCartProductsRemove })
      },
      getSummaryInformation: () => {

        const { cart } = get();

        const subTotal = cart.reduce((subTotal, product) => (product.quantity * product.price) + subTotal, 0)

        const tax = subTotal * 0.15;

        const total = subTotal + tax;

        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

        return {
          subTotal, tax, total, itemsInCart
        }

      },
      clearCart: () => {
        set({ cart: [] })
      },
    }),

    {
      name: 'shopping-cart',
    }
  )
);