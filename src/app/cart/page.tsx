import { Metadata } from "next";
import { CartItems } from "@/components/cart/CartItems";
import { CartSummary } from "@/components/cart/CartSummary";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "View and manage your shopping cart",
};

export default function CartPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 display-6 fw-bold text-foreground">Shopping Cart</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-border bg-card">
            <CartItems />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-border bg-card">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
} 