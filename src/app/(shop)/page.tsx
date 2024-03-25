import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const products = initialData.products;

export default async function Home() {

const productsTemp = await getPaginatedProductsWithImages()

  return (
     <>
      <Title 
      title="Tienda"
      subtitle="Todos los productos"
      className="mb-2"
      />

        <ProductGrid products={products} />

     </>
    
  );
}
