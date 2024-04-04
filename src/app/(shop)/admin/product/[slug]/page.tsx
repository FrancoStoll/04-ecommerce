import { getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/product/get-categories";



interface Props {
  params: {
    slug: string
  }
}

export default async function ProductAdminPage({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])


  // TODO: new
  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = (slug == 'new') ? 'Nuevo Producto' : 'Editar Producto'
  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}