'use client'

import { useEffect } from "react";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { IoInformationOutline } from "react-icons/io5";



export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);


  useEffect(() => {
    if (state === "Success") {
      // redirect
      // router.replace('/');

      window.location.replace('/')

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])



  return (
    <form action={dispatch} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email" />


      <label htmlFor="email">Contraseña</label>
      <input
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password" />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="mb-2 flex flex-row">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales no son correctas</p>
          </div>
        )}
      </div>

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}


function LoginButton() {
  const { pending } = useFormStatus();



  return (

    <button
      disabled={pending}
      type="submit"
      className={
        clsx({
          'btn-primary': !pending,
          'btn-disabled': pending
        })
      }>
      Ingresar
    </button>

  )
}



