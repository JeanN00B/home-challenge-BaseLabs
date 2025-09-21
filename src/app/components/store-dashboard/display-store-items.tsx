import { Product } from "@/generated/prisma";
import MediaCard from "../ui/Card";
import { useEffect, useState } from "react";

export default function DisplayStoreItems() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const run = async () => {
      const storeItems = await fetch("/api/products/get");
      const data = await storeItems.json();
      setProducts(data);
    };
    run();
  }, []);

  if (products == null) {
    return <div>No items found</div>;
  }
  return (
    <>
      {products.map((item: Product) => (
        <MediaCard key={item.id} {...item} />
      ))}
    </>
  );
}
