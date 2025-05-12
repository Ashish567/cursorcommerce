import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { OrderHistory } from "@/components/profile/OrderHistory";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account settings and view order history.",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5 fw-bold display-5 text-center">Profile</h1>
      <div className="row justify-content-center">
        <div className="col-lg-7 mb-4">
          <ProfileForm user={user} />
        </div>
        <div className="col-lg-7 mb-4">
          <OrderHistory orders={user.orders} />
        </div>
      </div>
    </div>
  );
} 