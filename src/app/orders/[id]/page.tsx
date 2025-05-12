import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderDetails } from "@/components/order/OrderDetails";

interface OrderPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    return {
      title: "Order Not Found",
      description: "The requested order could not be found.",
    };
  }

  return {
    title: `Order #${order.id}`,
    description: `View details for order #${order.id}`,
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    notFound();
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    notFound();
  }

  const order = await db.order.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>
      <OrderDetails order={order} />
    </div>
  );
} 