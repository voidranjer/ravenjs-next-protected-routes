import { useEffect, useState } from "react";
import { User as FirebaseUser, signOut as firebaseSignOut, browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export async function signIn(email: string, password: string, rememberMe: boolean = false) {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signOut() {
  return firebaseSignOut(auth);
}

export function useUser(cachedUser: FirebaseUser | null) {
  const [user, setUser] = useState<FirebaseUser | null>(cachedUser);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) window.localStorage.removeItem("user");
      else window.localStorage.setItem("user", JSON.stringify(user));
    });
  }, []);

  return user;
}
