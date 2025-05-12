'use client';

import Image from "next/image";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export function CartItems() {
  const { items, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5">
        <h2 className="display-6 fw-bold mb-2">Your cart is empty</h2>
        <p className="text-secondary">Add some items to your cart to continue shopping</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="position-relative" style={{ width: 64, height: 64 }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </td>
              <td className="fw-medium">{item.name}</td>
              <td>{formatPrice(item.price)}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="btn btn-outline-secondary btn-sm px-2"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-outline-secondary btn-sm px-2"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                <button
                  onClick={() => removeItem(item.id)}
                  className="btn btn-outline-danger btn-sm"
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