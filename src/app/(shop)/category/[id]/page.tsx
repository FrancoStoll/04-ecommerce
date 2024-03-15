import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params: {
    id: Category;
  }
}

const productos = initialData.products

export default function CategoryPage({ params }: Props) {

  const { id } = params

  const isProduct = productos.find(prod => prod.gender === id)
  if (!isProduct) {
    notFound()
  }

  const labels: Record<Category, string> = {
    'men': "Hombres",
    'women': "Mujeres",
    'kid': 'Niños',
    'unisex': 'Todos'
  }

  const filterProducts = productos.filter(producto => producto.gender === id)



  return (
    <>
      <Title title={`Articulos de ${labels[id]}`} subtitle={`Productos para ${labels[id]}`} />

      <ProductGrid products={filterProducts} />
    </>
  );
}