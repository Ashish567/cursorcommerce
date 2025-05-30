'use client';

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/prisma";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  // Only generate random values on the client
  const [rating, setRating] = useState("4.5");
  const [reviews, setReviews] = useState(123);

  useEffect(() => {
    setRating((Math.random() * 1.5 + 3.5).toFixed(1));
    setReviews(Math.floor(Math.random() * 2000 + 50));
  }, []);

  // Parse the images array from the database
  const images = typeof product.images === 'string'
    ? JSON.parse(product.images)
    : product.images || [];

  // Get the first image or use a placeholder
  let imageUrl = images[0];
  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://") && !imageUrl.startsWith("/"))
  ) {
    imageUrl = "/placeholder.png";
  }

  return (
    <div className="card shadow-sm border-border bg-card flex-fill h-100 hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`} className="text-decoration-none">
        <div className="d-flex justify-content-center align-items-center pt-4">
          <Image
            src={imageUrl}
            alt={product.name}
            width={160}
            height={160}
            className="card-img-top object-contain rounded-3 bg-background"
            style={{ maxHeight: 160, width: 'auto', height: 'auto' }}
            priority={false}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-semibold mb-2 text-foreground" style={{ minHeight: 48 }}>{product.name}</h5>
          <div className="d-flex justify-content-center align-items-center gap-1 mb-2">
            <Star className="text-primary" size={16} fill="currentColor" />
            <span className="small fw-medium text-muted-foreground">{rating}</span>
            <span className="small text-muted-foreground">({reviews})</span>
          </div>
          <div className="h5 fw-bold text-foreground mb-3">{formatPrice(product.price)}</div>
        </div>
      </Link>
      <div className="card-footer bg-transparent border-0 pb-4 px-4">
        <button
          onClick={() => addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: imageUrl,
          })}
          className="btn btn-primary w-100 fw-semibold shadow-sm hover:opacity-90 transition-opacity"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
} 