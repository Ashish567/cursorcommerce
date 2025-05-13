import { Product } from "@/types/prisma";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <div className="text-center text-muted-foreground py-5">No products found.</div>;
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
} 