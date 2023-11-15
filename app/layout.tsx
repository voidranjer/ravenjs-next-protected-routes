"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { LOGIN_ROUTE, SECRET1_ROUTE, SECRET2_ROUTE } from "@/lib/routes";
import { signOut, useUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = useUser();

  return (
    <html lang="en">
      <head>
        <title>Auth Demo</title>
      </head>
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link>
          <Link className="nav-secret" href={SECRET1_ROUTE}>
            Secret 1
          </Link>
          <Link className="nav-secret" href={SECRET2_ROUTE}>
            Secret 2
          </Link>
          {user ? <button onClick={signOut}>Logout</button> : <Link href={LOGIN_ROUTE}>Login</Link>}
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
