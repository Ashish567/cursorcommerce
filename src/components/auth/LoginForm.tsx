'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 400 }}>
      <h2 className="h4 fw-bold mb-4 text-center">Sign In</h2>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-medium">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
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
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-warning w-100 fw-semibold"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
} 