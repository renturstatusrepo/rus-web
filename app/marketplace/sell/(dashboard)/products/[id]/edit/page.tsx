import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ProductForm from "@/components/marketplace/ProductForm";
import { getAccount } from "@/lib/account";
import { getCategories } from "@/lib/marketplace";
import { getMyProduct } from "@/lib/seller";

export const metadata: Metadata = { title: "Edit product", robots: { index: false } };

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const account = await getAccount();
  if (!account) redirect("/marketplace/login?next=/marketplace/sell");

  const [product, categories] = await Promise.all([getMyProduct(decodeURIComponent(id), account.id), getCategories()]);
  if (!product) notFound();

  // Keep the product's current category selectable even if it isn't in the public list
  const options = categories.some((c) => c.slug === product.category)
    ? categories
    : [...categories, { slug: product.category, title: product.category }];

  return (
    <>
      <h2 className="mb-6 text-xl font-extrabold text-slate-900">Edit “{product.title}”</h2>
      <ProductForm
        categories={options}
        values={{
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          deliveryFee: product.deliveryFee || "",
          category: product.category,
          location: product.location,
          status: product.status,
          images: product.imageFiles.map((file, i) => ({ file, url: product.images[i] ?? "" })),
          sizes: product.sizes,
          colors: product.colors,
        }}
      />
    </>
  );
}
