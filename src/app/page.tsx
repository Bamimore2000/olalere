import { HeroSection } from "@/components/landing/HeroSection";
import { CategorySidebar } from "@/components/landing/CategorySidebar";
import { ProductCategorySection } from "@/components/landing/ProductCategorySection";
import { db } from "@/db";
import { products as productsTable } from "@/db/schema";

export default async function Home() {
  const allProducts = await db.select().from(productsTable);

  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="container mx-auto px-1 sm:px-2 md:px-3 py-4">
        {/* Top Section: Sidebar + Hero */}
        <div className="flex flex-col lg:flex-row gap-2 mb-4">
          <CategorySidebar />
          <div className="flex-1 rounded-sm overflow-hidden shadow-sm">
            <HeroSection />
          </div>
        </div>

        {/* Product Rows */}
        <div className="space-y-1">
          <ProductCategorySection
            title="Featured Necklaces"
            category="necklaces"
            products={allProducts.filter(p => p.category === 'necklaces')}
          />
          <ProductCategorySection
            title="Elegant Earrings"
            category="earrings"
            products={allProducts.filter(p => p.category === 'earrings')}
          />
          <ProductCategorySection
            title="Timeless Rings"
            category="rings"
            products={allProducts.filter(p => p.category === 'rings')}
          />
          <ProductCategorySection
            title="New Arrivals"
            category=""
            products={allProducts.slice(0, 4)}
          />
        </div>
      </div>
    </div>
  );
}

