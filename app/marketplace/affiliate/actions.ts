"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { callApi, errorMessage, getToken } from "@/lib/account";

export type ApplyState = { error?: string } | null;

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

export async function applyAffiliate(_prev: ApplyState, formData: FormData): Promise<ApplyState> {
  const token = await getToken();
  if (!token) redirect("/marketplace/login?next=/marketplace/affiliate");

  const channels = text(formData.get("channels")).slice(0, 500);
  const audience = text(formData.get("audience")).slice(0, 500);
  if (channels.length < 3) return { error: "Tell us where you’ll share your links." };

  const res = await callApi("/affiliate/apply", { method: "POST", token, body: { channels, ...(audience && { audience }) } });
  if (!res.ok) return { error: errorMessage(res, "We couldn’t send your application. Please try again.") };

  revalidatePath("/marketplace/affiliate");
  redirect("/marketplace/affiliate?applied=1");
}
