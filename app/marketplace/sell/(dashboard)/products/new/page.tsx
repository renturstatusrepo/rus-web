import type { Metadata } from "next";
import ProductForm from "@/components/marketplace/ProductForm";
import { getCategories } from "@/lib/marketplace";

export const metadata: Metadata = { title: "Add a product", robots: { index: false } };

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <>
      <h2 className="mb-6 text-xl font-extrabold text-slate-900">Add a product</h2>
      <ProductForm
        categories={categories}
        values={{
          title: "",
          description: "",
          price: "",
          quantity: 1,
          deliveryFee: "",
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
