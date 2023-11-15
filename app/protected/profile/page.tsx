"use client";

import { signOut } from "@/lib/auth";

export default function Profile() {
  async function handleLogout() {
    await signOut();
  }

  return (
    <div>
      <h1>Profile</h1>
      <button onClick={handleLogout}>Logout</button>
      <p style={{ color: "red" }}>*Requires Log In</p>
    </div>
  );
}
