import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container-fluid py-5 bg-secondary/10">
      <div className="row align-items-center justify-content-center g-5">
        {/* Hero Text */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold text-foreground mb-3">
            Shop Everything You Need, <span className="text-primary">All in One Place</span>
          </h1>
          <p className="lead text-muted-foreground mb-4">
            Discover amazing deals on electronics, fashion, home essentials, books, and more. Fast delivery, secure checkout, and top-rated customer service.
          </p>
          <Link
            href="/products"
            className="btn btn-primary btn-lg px-5 fw-semibold shadow-sm hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </div>
        {/* Hero Image */}
        <div className="col-md-6 d-flex justify-content-center">
          <Image
            src="https://images.unsplash.com/photo-1515168833906-d2a3b82b302c?auto=format&fit=crop&w=600&q=80"
            alt="Shopping Banner"
            width={400}
            height={300}
            className="rounded-4 shadow-lg object-cover border border-border"
            priority
          />
        </div>
      </div>
    </div>
  );
}
