import { NextResponse } from "next/server";
import { getAccount, getOrders } from "@/lib/account";
import { invoiceFor, invoicePdf } from "@/lib/invoice";

/**
 * The buyer's invoice for one checkout, as a PDF download.
 * Built from that buyer's own orders, so nobody can fetch someone else's invoice.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const [account, orders] = await Promise.all([getAccount(), getOrders()]);
  if (!account || !orders) {
    return NextResponse.json({ error: "Please log in to download this invoice." }, { status: 401 });
  }

  const invoice = invoiceFor(decodeURIComponent(reference), account, orders);
  if (!invoice) {
    return NextResponse.json({ error: "We couldn't find that order." }, { status: 404 });
  }

  const pdf = await invoicePdf(invoice);
  return new NextResponse(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="RUS-invoice-${invoice.reference}.pdf"`,
      "Content-Length": String(pdf.byteLength),
      "Cache-Control": "private, no-store",
    },
  });
}
