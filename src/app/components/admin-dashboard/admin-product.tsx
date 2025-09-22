import { Product } from "@/generated/prisma";
import UpdateProduct from "./update-product";
import { useEffect, useState } from "react";

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const run = async () => {
      const response = await fetch("/api/products/get");
      const data = await response.json();
      setProducts(data);
    };
    run();
  }, []);

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 h-full scrollbar overflow-y-auto gap-4">
        {products.map((item: Product) => (
          <UpdateProduct key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
