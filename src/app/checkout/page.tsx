import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase",
};

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            {/* Order summary will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
} 