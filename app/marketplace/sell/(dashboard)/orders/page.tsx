import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SellerOrderActions from "@/components/marketplace/SellerOrderActions";
import { formatPrice } from "@/lib/format";
import { getSellerOrders, type OrderStatus } from "@/lib/seller";

export const metadata: Metadata = { title: "Orders to fulfil", robots: { index: false } };

type SearchParams = Promise<{ status?: string }>;

const FILTERS: { value?: OrderStatus; label: string }[] = [
  { label: "All" },
  { value: "paid", label: "To ship" },
  { value: "in-transit", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const statusBadge: Record<OrderStatus, { label: string; className: string }> = {
  paid: { label: "To ship", className: "bg-blue-50 text-blue-700" },
  "in-transit": { label: "Shipped", className: "bg-indigo-50 text-indigo-700" },
  delivered: { label: "Delivered", className: "bg-amber-50 text-amber-800" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500" },
};

export default async function SellerOrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const { status: requested } = await searchParams;
  const status = FILTERS.find((f) => f.value === requested)?.value;
  const orders = await getSellerOrders(status);

  return (
    <>
      <nav aria-label="Filter orders" className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {FILTERS.map((f) => {
          const active = f.value === status;
          return (
            <Link
              key={f.label}
              href={f.value ? `/marketplace/sell/orders?status=${f.value}` : "/marketplace/sell/orders"}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
                active ? "border-purple-700 bg-purple-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-purple-300"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </nav>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-slate-900">No orders here yet</p>
          <p className="mt-2 text-sm text-slate-500">When buyers order your products, they appear here for you to ship.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((o) => {
            const badge = statusBadge[o.status] ?? { label: o.status, className: "bg-slate-100 text-slate-600" };
            return (
              <li key={o.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {o.product?.image && <Image src={o.product.image} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-slate-900">{o.product?.title ?? "Product removed"}</p>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${badge.className}`}>{badge.label}</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        #{o.orderId} ·{" "}
                        {new Date(o.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                        {` · Qty ${o.quantity}`}
                        {o.size && ` · ${o.size}`}
                        {o.color && ` · ${o.color}`}
                      </p>
                      <p className="font-extrabold text-slate-900">{formatPrice(o.amount)}</p>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">{o.buyerName}</span>
                        {(o.deliveryAddress || o.deliveryState) && (
                          <>
                            {" · "}
                            {[o.deliveryAddress, o.deliveryState].filter(Boolean).join(", ")}
                          </>
                        )}
                      </p>
                      {o.cancellation && (
                        <p className="text-xs text-slate-600">
                          {o.cancellation.by === "seller" ? "You cancelled this order" : `Cancelled by the ${o.cancellation.by}`}
                          {o.cancellation.reason && `: “${o.cancellation.reason}”`}
                          {o.cancellation.refund > 0 && ` · ${formatPrice(o.cancellation.refund)} refunded to the buyer`}
                        </p>
                      )}
                    </div>
                  </div>
                  <SellerOrderActions id={o.id} status={o.status} amount={o.amount} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
