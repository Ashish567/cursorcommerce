import { useState } from "react";
import { Product, Order, OrderItem, User } from "@/types/prisma";
import { ProductManagement } from "./ProductManagement";
import { OrderManagement } from "./OrderManagement";

interface OrderWithDetails extends Order {
  user: User;
  items: (OrderItem & {
    product: Product;
  })[];
}

interface AdminDashboardProps {
  products: Product[];
  orders: OrderWithDetails[];
}

export function AdminDashboard({ products, orders }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-medium ${
            activeTab === "products"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-medium ${
            activeTab === "orders"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Orders
        </button>
      </div>

      <div>
        {activeTab === "products" ? (
          <ProductManagement products={products} />
        ) : (
          <OrderManagement orders={orders} />
        )}
      </div>
    </div>
  );
} 