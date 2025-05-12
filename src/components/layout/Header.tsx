'use client';

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/store/cart";
import { useState } from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Home",
  "Books",
  "Toys",
  "Sports",
  "More",
];

export function Header() {
  const { data: session } = useSession();
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const [search, setSearch] = useState("");

  return (
    <>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          {/* Logo */}
          <Link href="/" className="navbar-brand fw-bold text-warning fs-3">
            E-Commerce
          </Link>

          {/* Search Bar */}
          <form className="d-flex mx-auto w-50" onSubmit={e => { e.preventDefault(); window.location.href = `/products?search=${encodeURIComponent(search)}`; }}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="btn btn-warning text-white fw-semibold" type="submit">
              Search
            </button>
          </form>

          {/* Cart & Profile/Login */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            <Link href="/cart" className="position-relative btn btn-link p-0">
              <ShoppingCart className="h-6 w-6 text-dark" />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {session ? (
              <Link href="/profile" className="d-flex align-items-center gap-2 btn btn-link p-0">
                <User className="h-6 w-6 text-dark" />
                <span className="fw-medium text-dark">{session.user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="btn btn-outline-warning fw-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      {/* Category Bar */}
      <nav className="bg-warning bg-opacity-10 border-top border-bottom border-warning py-2">
        <div className="container d-flex gap-4 overflow-auto">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className="text-dark text-decoration-none fw-medium px-2 py-1 rounded hover-bg-warning"
              style={{ whiteSpace: 'nowrap' }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
} 