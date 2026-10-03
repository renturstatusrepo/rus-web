import type { Metadata } from "next";
import ProductForm from "@/components/marketplace/ProductForm";
import { getAffiliateSettings } from "@/lib/affiliate";
import { getCategories } from "@/lib/marketplace";

export const metadata: Metadata = { title: "Add a product", robots: { index: false } };

export default async function NewProductPage() {
  const [categories, affiliate] = await Promise.all([getCategories(), getAffiliateSettings()]);
  return (
    <>
      <h2 className="mb-6 text-xl font-extrabold text-slate-900">Add a product</h2>
      <ProductForm
        categories={categories}
        affiliate={affiliate}
        values={{
          title: "",
          description: "",
          price: "",
          quantity: 1,
          deliveryFee: "",
          affiliateRate: "",
          category: "",
          location: "",
          status: "available",
          images: [],
          sizes: [],
          colors: [],
        }}
      />
    </>
  );
}
