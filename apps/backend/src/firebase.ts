import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const app = initializeApp({
  credential: credential.applicationDefault(),
});
export const db = getFirestore(app);
