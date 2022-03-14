import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebaseApp";

export async function createUserWithEmailPass(
  email,
  password,
  firstName,
  lastName
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithEmailPass(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  } catch (error) {
    console.log(error);
  }
}
