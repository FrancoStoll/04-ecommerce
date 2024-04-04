export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Pagination, Title } from '@/components';


import Link from 'next/link';
import { redirect } from "next/navigation";
import { IoCardOutline } from 'react-icons/io5';
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page: string
  }
}

export default async function OrdersPageAdmin({ searchParams }: Props) {

  const page = parseInt(searchParams.page) ?? 1;

  const { ok, users = [], totalPages } = await getPaginatedUsers({page: page});

  if (!ok) {
    redirect('/');
  }
  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>

      <Pagination totalPages={totalPages ?? 5} />
    </>
  );
}