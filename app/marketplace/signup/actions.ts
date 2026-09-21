"use server";

import { redirect } from "next/navigation";
import { callApi, errorMessage, startSession } from "@/lib/account";
import { NIGERIAN_STATES, safeNext } from "@/lib/format";

// Sign-up mirrors the app: prove the email with an emailed code, then choose a profile and password.
// The code is checked again by the API when the account is created, so skipping a step gains nothing.

export type SignupState = {
  step: "email" | "code" | "profile";
  email?: string;
  code?: string;
  error?: string;
};

const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

export async function sendSignupCode(_prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = text(formData.get("email")).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { step: "email", email, error: "Enter a valid email address." };

  const res = await callApi("/user/signup-otp", { method: "POST", body: { email } });
  if (!res.ok) return { step: "email", email, error: errorMessage(res, "We couldn’t send a code to that address. Please try again.") };
  return { step: "code", email };
}

export async function checkSignupCode(prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = text(formData.get("email")).toLowerCase();
  const code = text(formData.get("code"));
  if (!code) return { ...prev, step: "code", email, error: "Enter the code we emailed you." };

  const res = await callApi("/user/verify-signup-otp", { method: "POST", body: { email, code } });
  if (!res.ok) return { step: "code", email, error: errorMessage(res, "That code didn’t work. Please try again.") };
  return { step: "profile", email, code };
}

export async function createAccount(prev: SignupState, formData: FormData): Promise<SignupState> {
  const email = text(formData.get("email")).toLowerCase();
  const code = text(formData.get("code"));
  const name = text(formData.get("name"));
  const username = text(formData.get("username")).toLowerCase();
  const state = text(formData.get("state"));
  const phone = text(formData.get("phone"));
  const password = typeof formData.get("password") === "string" ? (formData.get("password") as string) : "";
  const confirm = typeof formData.get("confirm") === "string" ? (formData.get("confirm") as string) : "";
  const back = (error: string): SignupState => ({ step: "profile", email, code, error });

  if (name.length < 2) return back("Enter your full name.");
  if (!/^[a-z0-9_]{3,30}$/.test(username)) return back("Usernames are 3–30 letters, numbers or underscores.");
  if (!NIGERIAN_STATES.includes(state)) return back("Choose your state.");
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return back("Use at least 8 characters, with a letter and a number.");
  }
  if (password !== confirm) return back("The passwords don’t match.");

  const taken = await callApi(`/users/username?query=${encodeURIComponent(username)}`);
  if (taken.ok && taken.body?.data?.isExist) return back("That username is taken. Try another.");

  const res = await callApi("/user/create", {
    method: "POST",
    body: { email, password, name, username, location: state, country: "Nigeria", ...(phone && { phone }), otp: code },
  });
  if (!res.ok) return back(errorMessage(res, "We couldn’t create your account. Please try again."));

  // The API signs the new account in straight away; fall back to the login page if it didn't
  if (!(await startSession(res.body))) redirect("/marketplace/login");
  redirect(safeNext(text(formData.get("next")) || "/marketplace/account"));
}
