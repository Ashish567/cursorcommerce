import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

// Type for Fake Store API product
interface FakeStoreProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 10);
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Regular User",
      password: userPassword,
      role: "USER",
    },
  });

  // Fetch base products from Fake Store API
  let baseProducts: FakeStoreProduct[] = [];
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    baseProducts = await response.json();
    console.log("Fetched", baseProducts.length, "base products from Fake Store API");
  } catch (err) {
    console.error("Error fetching from Fake Store API:", err);
  }

  // Generate 100+ dummy products
  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Books",
    "Toys",
    "Sports",
    "More",
  ];

  const products = Array.from({ length: 120 }).map((_, i) => {
    const base = randomPick(baseProducts) as FakeStoreProduct;
    return {
      name: `${base.title} ${i + 1}`,
      description: base.description,
      price: Math.round((base.price * (0.8 + Math.random() * 0.4)) * 100) / 100,
      stock: randomInt(10, 100),
      category: randomPick(categories),
      images: [base.image],
    };
  });

  console.log("Preparing to insert", products.length, "products");
  try {
    const result = await prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
    console.log("Inserted products successfully! Result:", result);
  } catch (e) {
    console.error("Error inserting products:", e);
  }

  console.log("Database has been seeded with 100+ products. 🌱");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 