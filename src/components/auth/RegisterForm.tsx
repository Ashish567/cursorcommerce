'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Something went wrong. Please try again.");
        return;
      }
      router.push("/login");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
      <h2 className="h4 fw-bold mb-4 text-center">Create an account</h2>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-medium">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="John Doe"
        />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="name@example.com"
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label fw-medium">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="Enter your password"
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-warning w-100 fw-semibold"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </button>
      <div className="text-center mt-3">
        <a href="/login">Already have an account? Sign in</a>
      </div>
    </form>
  );
} 