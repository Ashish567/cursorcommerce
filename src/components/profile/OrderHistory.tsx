import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Order, OrderItem, Product } from "@/types/prisma";

interface OrderWithItems extends Order {
  items: (OrderItem & {
    product: Product;
  })[];
}

interface OrderHistoryProps {
  orders: OrderWithItems[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(order.total)}</p>
                <p className="text-sm text-gray-500 capitalize">
                  {order.status.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <Link
                href={`/orders/${order.id}`}
                className="text-sm text-primary hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 