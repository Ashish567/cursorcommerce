'use client';

import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartSummary() {
  const { items } = useCart();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="card-body">
      <h2 className="h5 fw-bold mb-3 text-foreground">Order Summary</h2>
      <ul className="list-group list-group-flush mb-3">
        <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-border bg-transparent">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="fw-medium text-foreground">{formatPrice(subtotal)}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center px-0 border-border bg-transparent">
          <span className="text-muted-foreground">Shipping</span>
          <span className="fw-medium text-foreground">{formatPrice(shipping)}</span>
        </li>
        <li className="list-group-item border-0 pt-3 d-flex justify-content-between align-items-center px-0 bg-transparent">
          <span className="h6 fw-bold text-foreground">Total</span>
          <span className="h6 fw-bold text-foreground">{formatPrice(total)}</span>
        </li>
      </ul>
      <Link
        href="/checkout"
        className="btn btn-primary w-100 fw-semibold shadow-sm mt-2 hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
} 