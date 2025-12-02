import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import SummaryApi from "../ApiBackend/SummaryAPI";
import { auth } from "../Firebase";

export async function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();
    const res = await fetch(SummaryApi.googleLogin.url, {
      method: SummaryApi.googleLogin.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        displayName: user.displayName,
        photoURL: user.photoURL,
        providerId: user.providerId,
        email: user.email,
        uid: user.uid,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${res.status}`);
    }

    const data = await res.json();
    return { user, data };
  } catch (err: any) {
    console.error("Google login failed:", err);
    throw err;
  }
}
