// Builds the buyer's invoice for one checkout, as a PDF.
import "server-only";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import type { Account, Order } from "@/lib/account";

export type Invoice = {
  reference: string;
  issued: Date;
  buyer: { name: string; email: string };
  deliverTo: string;
  lines: Order[];
  /** Every store in this checkout, in the order their items appear */
  sellers: { name: string; logo: string | null }[];
  items: number;
  delivery: number;
  discount: number;
  total: number;
  refunded: number;
};

/** The orders paid for in one checkout, newest first elsewhere but oldest first on the invoice. */
export function invoiceFor(reference: string, account: Account, orders: Order[]): Invoice | null {
  const lines = orders.filter((o) => o.reference === reference).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  if (lines.length === 0) return null;

  const first = lines[0];
  const sellers: Invoice["sellers"] = [];
  for (const { seller } of lines) {
    if (!sellers.some((s) => s.name === seller.name)) sellers.push(seller);
  }

  return {
    reference,
    issued: new Date(first.createdAt),
    buyer: { name: account.name, email: account.email },
    deliverTo: [first.deliveryAddress, first.deliveryState].filter(Boolean).join(", "),
    lines,
    sellers,
    items: lines.reduce((sum, o) => sum + o.price, 0),
    delivery: lines.reduce((sum, o) => sum + o.deliveryFee, 0),
    discount: lines.reduce((sum, o) => sum + o.discount, 0),
    total: lines.reduce((sum, o) => sum + Math.max(0, o.price + o.deliveryFee - o.discount), 0),
    refunded: lines.reduce((sum, o) => sum + (o.cancellation?.refund ?? 0), 0),
  };
}

// Amounts are written as "NGN 5,500.00": the ₦ sign isn't in the PDF standard fonts.
const money = (n: number) => `NGN ${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const date = (d: Date) => d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

const PAGE = { width: 595.28, height: 841.89 }; // A4, points
const MARGIN = 48;
const BRAND = rgb(0.494, 0.133, 0.807);
const INK = rgb(0.06, 0.09, 0.16);
const MUTED = rgb(0.42, 0.45, 0.5);
const LINE = rgb(0.85, 0.87, 0.9);

/** Standard PDF fonts are Latin-1 only; anything else (emoji, ₦, curly quotes) would throw on draw. */
const safe = (text: string) =>
  (text ?? "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/₦/g, "NGN ")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");

// Store logos are only ever fetched from our own asset hosts, so a stored URL can't point
// the server at somewhere else. pdf-lib can embed PNG and JPEG; anything else is skipped.
const ASSET_ORIGINS = new Set(
  [process.env.ASSET_URL, "https://rus-assets.fra1.cdn.digitaloceanspaces.com"]
    .filter((value): value is string => Boolean(value))
    .map((value) => {
      try {
        return new URL(value).origin;
      } catch {
        return "";
      }
    })
    .filter(Boolean),
);
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

async function embedLogo(pdf: PDFDocument, url: string | null): Promise<PDFImage | null> {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (!ASSET_ORIGINS.has(parsed.origin)) return null;

  try {
    const res = await fetch(parsed, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    if (!bytes.byteLength || bytes.byteLength > MAX_LOGO_BYTES) return null;
    if (bytes[0] === 0x89 && bytes[1] === 0x50) return await pdf.embedPng(bytes);
    if (bytes[0] === 0xff && bytes[1] === 0xd8) return await pdf.embedJpg(bytes);
  } catch (error) {
    // A missing or unreadable logo must never cost the buyer their invoice
    console.error(`Invoice logo could not be loaded: ${url}`, error);
  }
  return null;
}

function fit(text: string, font: PDFFont, size: number, maxWidth: number) {
  let out = safe(text);
  if (font.widthOfTextAtSize(out, size) <= maxWidth) return out;
  while (out.length > 1 && font.widthOfTextAtSize(`${out}...`, size) > maxWidth) out = out.slice(0, -1);
  return `${out}...`;
}

export async function invoicePdf(invoice: Invoice): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`RUS invoice ${invoice.reference}`);
  pdf.setProducer("RentUrStatus");
  pdf.setCreationDate(invoice.issued);

  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const logos = await Promise.all(invoice.sellers.map((seller) => embedLogo(pdf, seller.logo)));

  let page: PDFPage = pdf.addPage([PAGE.width, PAGE.height]);
  let y = PAGE.height - MARGIN;
  const right = PAGE.width - MARGIN;

  const text = (value: string, x: number, size: number, font = regular, color = INK) =>
    page.drawText(safe(value), { x, y, size, font, color });
  const textRight = (value: string, size: number, font = regular, color = INK) =>
    page.drawText(safe(value), { x: right - font.widthOfTextAtSize(safe(value), size), y, size, font, color });
  const rule = (thickness = 0.75, color = LINE) =>
    page.drawLine({ start: { x: MARGIN, y }, end: { x: right, y }, thickness, color });
  const newPageIfNeeded = (needed: number) => {
    if (y - needed > MARGIN + 60) return;
    page = pdf.addPage([PAGE.width, PAGE.height]);
    y = PAGE.height - MARGIN;
  };

  // Header
  page.drawRectangle({ x: 0, y: PAGE.height - 96, width: PAGE.width, height: 96, color: BRAND });
  y = PAGE.height - 46;
  page.drawText("RUS Marketplace", { x: MARGIN, y, size: 20, font: bold, color: rgb(1, 1, 1) });
  page.drawText("INVOICE", { x: right - bold.widthOfTextAtSize("INVOICE", 20), y, size: 20, font: bold, color: rgb(1, 1, 1) });
  y -= 20;
  page.drawText("RentUrStatus", { x: MARGIN, y, size: 10, font: regular, color: rgb(1, 1, 1) });
  page.drawText(`#${safe(invoice.reference)}`, {
    x: right - regular.widthOfTextAtSize(`#${safe(invoice.reference)}`, 10),
    y,
    size: 10,
    font: regular,
    color: rgb(1, 1, 1),
  });

  // Parties
  y = PAGE.height - 140;
  text("BILLED TO", MARGIN, 8, bold, MUTED);
  textRight("INVOICE DATE", 8, bold, MUTED);
  y -= 14;
  text(invoice.buyer.name || "RUS buyer", MARGIN, 11, bold);
  textRight(date(invoice.issued), 11);
  y -= 13;
  text(invoice.buyer.email, MARGIN, 10, regular, MUTED);
  y -= 13;
  if (invoice.deliverTo) {
    text(fit(`Deliver to: ${invoice.deliverTo}`, regular, 10, right - MARGIN), MARGIN, 10, regular, MUTED);
    y -= 13;
  }

  // Sold by: the store (or stores) behind this checkout, with their logo where they have one
  y -= 14;
  rule();
  y -= 16;
  text(invoice.sellers.length > 1 ? "SOLD BY THESE STORES" : "SOLD BY", MARGIN, 8, bold, MUTED);
  y -= 8;
  invoice.sellers.forEach((seller, index) => {
    const logo = logos[index];
    const row = 28;
    const top = y;
    let x = MARGIN;
    if (logo) {
      const size = logo.scaleToFit(row, row);
      page.drawImage(logo, {
        x,
        y: top - row + (row - size.height) / 2,
        width: size.width,
        height: size.height,
      });
      x += row + 10;
    }
    page.drawText(fit(seller.name, bold, 12, right - x), { x, y: top - row + 9, size: 12, font: bold, color: INK });
    y = top - row - 4;
  });

  // Items
  y -= 10;
  rule();
  y -= 16;
  const columns = { item: MARGIN, qty: 330, price: 390, total: right };
  text("ITEM", columns.item, 8, bold, MUTED);
  text("QTY", columns.qty, 8, bold, MUTED);
  text("UNIT", columns.price, 8, bold, MUTED);
  textRight("AMOUNT", 8, bold, MUTED);
  y -= 8;
  rule();
  y -= 18;

  for (const line of invoice.lines) {
    newPageIfNeeded(56);
    const amount = Math.max(0, line.price + line.deliveryFee - line.discount);
    const unit = line.quantity > 0 ? line.price / line.quantity : line.price;

    text(fit(line.product?.title ?? "Item", bold, 10, columns.qty - columns.item - 12), columns.item, 10, bold);
    text(String(line.quantity), columns.qty, 10);
    text(money(unit), columns.price, 10);
    textRight(money(amount), 10, bold);
    y -= 12;

    const notes = [
      // Named per line only when the checkout spans more than one store, since the block above covers it otherwise
      invoice.sellers.length > 1 ? `Sold by ${line.seller.name}` : "",
      line.size ? `Size ${line.size}` : "",
      line.color ? `Colour ${line.color}` : "",
      line.deliveryFee > 0 ? `Delivery ${money(line.deliveryFee)}` : "",
      `#${line.orderId}`,
    ].filter(Boolean);
    text(fit(notes.join("  -  "), regular, 8, right - MARGIN), columns.item, 8, regular, MUTED);
    y -= 11;

    if (line.cancellation) {
      text(
        `Cancelled by the ${line.cancellation.by} - ${money(line.cancellation.refund)} refunded to wallet`,
        columns.item,
        8,
        bold,
        rgb(0.7, 0.15, 0.15),
      );
      y -= 11;
    }
    y -= 6;
    rule(0.5, rgb(0.93, 0.94, 0.96));
    y -= 14;
  }

  // Totals
  newPageIfNeeded(120);
  y -= 6;
  const totalRow = (label: string, value: string, strong = false) => {
    const font = strong ? bold : regular;
    page.drawText(safe(label), { x: 330, y, size: strong ? 11 : 10, font, color: strong ? INK : MUTED });
    textRight(value, strong ? 11 : 10, font);
    y -= strong ? 18 : 15;
  };
  totalRow("Items", money(invoice.items));
  totalRow("Delivery", money(invoice.delivery));
  if (invoice.discount > 0) totalRow("Discount", `-${money(invoice.discount)}`);
  y -= 2;
  page.drawLine({ start: { x: 330, y: y + 8 }, end: { x: right, y: y + 8 }, thickness: 0.75, color: LINE });
  totalRow("Total paid", money(invoice.total), true);
  if (invoice.refunded > 0) {
    totalRow("Refunded", `-${money(invoice.refunded)}`);
    totalRow("Net", money(Math.max(0, invoice.total - invoice.refunded)), true);
  }

  // Footer
  const footerY = MARGIN + 6;
  page.drawLine({ start: { x: MARGIN, y: footerY + 34 }, end: { x: right, y: footerY + 34 }, thickness: 0.75, color: LINE });
  page.drawText(safe("Paid from your RUS wallet. Payments are held in escrow and released to the seller once you confirm delivery."), {
    x: MARGIN,
    y: footerY + 20,
    size: 8,
    font: regular,
    color: MUTED,
  });
  page.drawText(safe("RentUrStatus - renturstatus.com - support@renturstatus.com"), {
    x: MARGIN,
    y: footerY + 8,
    size: 8,
    font: regular,
    color: MUTED,
  });

  return pdf.save();
}
