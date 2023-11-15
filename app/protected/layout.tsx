"use client";

import { useUser } from "@/lib/auth";
import { ReactNode } from "react";
import AuthGuard from "@/app/protected/_components/AuthGuard";

export default function Layout({ children }: { children: ReactNode }) {
  const user = useUser(JSON.parse(localStorage.getItem("user") || "null"));

  if (!user) return <AuthGuard />;
  return children;
}
