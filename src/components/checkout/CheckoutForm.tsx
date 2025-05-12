"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          ...data,
        }),
      });

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

      clearCart();
      router.push("/orders");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 mb-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="card-title mb-4 text-center fw-bold">Checkout</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`form-control${errors.name ? " is-invalid" : ""}`}
                    id="name"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className={`form-control${errors.email ? " is-invalid" : ""}`}
                    id="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label fw-semibold">Address</label>
                  <input
                    {...register("address")}
                    type="text"
                    className={`form-control${errors.address ? " is-invalid" : ""}`}
                    id="address"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address.message}</div>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label fw-semibold">City</label>
                    <input
                      {...register("city")}
                      type="text"
                      className={`form-control${errors.city ? " is-invalid" : ""}`}
                      id="city"
                      placeholder="City"
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city.message}</div>
                    )}
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state" className="form-label fw-semibold">State</label>
                    <input
                      {...register("state")}
                      type="text"
                      className={`form-control${errors.state ? " is-invalid" : ""}`}
                      id="state"
                      placeholder="State"
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state.message}</div>
                    )}
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor="zipCode" className="form-label fw-semibold">ZIP</label>
                    <input
                      {...register("zipCode")}
                      type="text"
                      className={`form-control${errors.zipCode ? " is-invalid" : ""}`}
                      id="zipCode"
                      placeholder="ZIP"
                    />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode.message}</div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-warning w-100 fw-semibold mt-3 shadow-sm"
                >
                  {isLoading ? "Processing..." : "Complete Purchase"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title mb-4 fw-bold">Order Summary</h3>
              {/* Placeholder for order summary - replace with your actual summary component or logic */}
              <ul className="list-group mb-3">
                {items.length === 0 ? (
                  <li className="list-group-item">Your cart is empty.</li>
                ) : (
                  items.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name} <span className="text-muted">x{item.quantity || 1}</span></span>
                      <span>₹{item.price}</span>
                    </li>
                  ))
                )}
              </ul>
              {items.length > 0 && (
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total</span>
                  <span className="fw-bold h5 mb-0">
                    ₹{items.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 