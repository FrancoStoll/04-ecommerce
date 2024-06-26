import Link from 'next/link';

import { Title } from '@/components';
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { Country } from "@prisma/client";
import { countries } from '../../../../seed/seed-countries';
import { auth } from "@/auth.config";



export default async function AddressPage() {


  const session = await auth();

  const countries = await getCountries()

  if (!session?.user) {
    return (
      <h3 className="text-5xl">500 - No hay sesión de usuario</h3>
    )
  }

  const address = await getUserAddress(session?.user.id) ?? undefined



  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subtitle="Dirección de entrega" />
        <span className="py-2 text-sm">Completar todos los campos que sean obligatorios*</span>
        <AddressForm countries={countries} userStoredAddress={address} />

      </div>

    </div>
  );
}