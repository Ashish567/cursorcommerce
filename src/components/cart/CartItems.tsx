'use client';

import Image from "next/image";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartItems() {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <h2 className="display-6 fw-bold mb-2 text-foreground">Your cart is empty</h2>
        <p className="text-muted-foreground">Add some items to your cart to continue shopping</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0">
        <thead>
          <tr className="border-border">
            <th scope="col" className="text-foreground">Product</th>
            <th scope="col" className="text-foreground">Name</th>
            <th scope="col" className="text-foreground">Price</th>
            <th scope="col" className="text-foreground">Quantity</th>
            <th scope="col" className="text-foreground">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-border">
              <td>
                <div className="position-relative" style={{ width: 64, height: 64 }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded border border-border"
                  />
                </div>
              </td>
              <td className="fw-medium text-foreground">{item.name}</td>
              <td className="text-foreground">{formatPrice(item.price)}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="btn btn-outline-primary btn-sm px-2 hover:opacity-90 transition-opacity"
                  >
                    -
                  </button>
                  <span className="px-2 text-foreground">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-outline-primary btn-sm px-2 hover:opacity-90 transition-opacity"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button
                  onClick={() => removeItem(item.id)}
                  className="btn btn-outline-danger btn-sm hover:opacity-90 transition-opacity"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 