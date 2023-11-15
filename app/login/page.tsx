"use client";

import { signIn } from "@/lib/auth";
import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTE } from "@/lib/routes";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const continueTo = searchParams.get("continueTo");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.username.value;
    const password = form.password.value;
    const rememberMe = form.rememberMe.checked;

    try {
      await signIn(username, password, rememberMe);
      router.replace(continueTo || ADMIN_ROUTE); // WARNING: Security issue, should be validated if it's a invalid/malicious URL
    } catch (error) {
      window.alert(error);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="rememberMe">Remember me:</label>
        <input type="checkbox" id="rememberMe" name="rememberMe" />

        <button type="submit">Login</button>

        {continueTo && <pre>next: {continueTo}</pre>}
      </form>
    </div>
  );
}
