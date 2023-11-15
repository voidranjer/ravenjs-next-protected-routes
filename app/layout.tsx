"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LOGIN_ROUTE, ADMIN_ROUTE, PROFILE_ROUTE } from "@/lib/routes";
import { useUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = useUser(JSON.parse(window.localStorage.getItem("user") ?? "null"));

  return (
    <html lang="en">
      <head>
        <title>Auth Demo</title>
      </head>
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link>
          <Link className="nav-secret" href={ADMIN_ROUTE}>
            Admin
          </Link>
          <Link className="nav-secret" href={PROFILE_ROUTE}>
            Profile
          </Link>
          {user ? user?.email : <Link href={LOGIN_ROUTE}>Login</Link>}
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
