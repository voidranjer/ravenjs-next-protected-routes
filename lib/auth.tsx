import { useEffect, useState } from "react";
import { User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
  if (rememberMe) await setPersistence(auth, browserLocalPersistence);
  else await setPersistence(auth, browserSessionPersistence);

  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function useUser(cachedUser: FirebaseUser | null) {
  // cachedUser parameter is extra work but necessary in order to prevent hydration problems
  const [user, setUser] = useState<FirebaseUser | null>(cachedUser);

  useEffect(() => {
    if (typeof window === "undefined") return;
    onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUser(currentUser);
      if (!currentUser) localStorage.removeItem("user");
    });
  }, []);

  return user;
}
