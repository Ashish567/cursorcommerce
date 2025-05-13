import { Metadata } from "next";
import { db } from "@/lib/db";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters";

export const metadata: Metadata = {
  title: "Products | E-Commerce",
  description: "Browse our products",
};

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await db.product.findMany({
    where: {
      category: searchParams.category || undefined,
      OR: searchParams.search
        ? [
            { name: { contains: searchParams.search, mode: "insensitive" } },
            { description: { contains: searchParams.search, mode: "insensitive" } },
          ]
        : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await db.product.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-foreground">Products</h1>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card border-border bg-card">
            <div className="card-body">
              <ProductFilters categories={categories.map((cat: { category: string }) => cat.category)} />
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
} 