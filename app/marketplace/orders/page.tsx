import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import CancelOrderForm from "@/components/marketplace/CancelOrderForm";
import ConfirmReceiptButton from "@/components/marketplace/ConfirmReceiptButton";
import { getOrders, type Order } from "@/lib/account";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Your orders", robots: { index: false } };

type SearchParams = Promise<{ placed?: string }>;

const statusBadge: Record<string, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-blue-50 text-blue-700" },
  "in-transit": { label: "Shipped", className: "bg-indigo-50 text-indigo-700" },
  delivered: { label: "Delivered", className: "bg-amber-50 text-amber-800" },
  completed: { label: "Completed", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-slate-100 text-slate-500" },
};

// What the buyer paid for this item, and so what a cancellation refunds
const total = (o: Order) => Math.max(0, o.price + o.deliveryFee - o.discount);

export default async function OrdersPage({ searchParams }: { searchParams: SearchParams }) {
  const [orders, { placed }] = await Promise.all([getOrders(), searchParams]);
  if (!orders) redirect("/marketplace/login?next=/marketplace/orders");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Your orders</h1>

      {placed !== undefined && (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
          <p className="font-extrabold">Order placed{placed && ` · #${placed}`}</p>
          <p className="mt-1 text-sm">
            The seller has been notified. Your payment is held in escrow until you confirm the order arrived.
          </p>
        </div>
      )}

      {orders.length === 0 ? (
        <p className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center font-semibold text-slate-500">
          You haven’t ordered anything yet.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {order.product?.image && <Image src={order.product.image} alt="" fill sizes="64px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  {order.product ? (
                    <Link
                      href={`/marketplace/product/${encodeURIComponent(order.product.id)}`}
                      className="line-clamp-1 font-bold text-slate-900 hover:text-purple-700"
                    >
                      {order.product.title}
                    </Link>
                  ) : (
                    <span className="font-bold text-slate-500">Product removed</span>
                  )}
                  <p className="text-xs text-slate-500">
                    #{order.orderId} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    {` · Qty ${order.quantity}`}
                    {order.size && ` · ${order.size}`}
                    {order.color && ` · ${order.color}`}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-extrabold text-slate-900">{formatPrice(total(order))}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${statusBadge[order.status]?.className ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {statusBadge[order.status]?.label ?? order.status}
                    </span>
                  </div>
                  {order.cancellation && (
                    <p className="mt-1 text-xs text-slate-600">
                      {order.cancellation.by === "buyer" ? "You cancelled this order" : `Cancelled by the ${order.cancellation.by}`}
                      {order.cancellation.reason && `: “${order.cancellation.reason}”`}
                      {order.cancellation.refund > 0 && (
                        <span className="font-semibold text-emerald-700"> · {formatPrice(order.cancellation.refund)} refunded to your wallet</span>
                      )}
                    </p>
                  )}
                  {order.status === "in-transit" && (
                    <p className="mt-1 text-xs text-slate-500">On its way. Confirm receipt once it has been delivered.</p>
                  )}
                </div>
              </div>
              {(order.status === "paid" || order.status === "delivered") && (
                <div className="flex flex-col items-stretch gap-2 sm:items-end">
                  <ConfirmReceiptButton id={order.id} />
                  {order.status === "paid" && <CancelOrderForm id={order.id} refund={total(order)} as="buyer" />}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
