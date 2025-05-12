"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "@/types/prisma";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
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
              <h2 className="card-title mb-4 text-center fw-bold">Profile Information</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className={`form-control${errors.name ? " is-invalid" : ""}`}
                    id="name"
                    placeholder="Enter your name"
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-warning w-100 fw-semibold mt-3 shadow-sm"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 