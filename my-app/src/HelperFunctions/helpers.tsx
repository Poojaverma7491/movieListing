// src/utils/helpers.ts
import { Auth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Axios from "axios";
import toast from "react-hot-toast";
import SummaryApi from "../ApiBackend/SummaryAPI";
import AxiosToastError from "../Utils/AxiosToastError";

/**
 * Handles Google login flow using Firebase + backend API.
 * @param auth Firebase auth instance
 * @param checkUser Function to refresh user state after login
 * @param navigate React Router navigate function
 * @param link Redirect link or search string
 */
export const handleGoogleLogin = async (
  auth: Auth,
  checkUser: () => Promise<void>,
  navigate: (path: string) => void,
  link: string
) => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const payload = {
      fullName: user.displayName,
      email: user.email,
      googleId: user.uid,
      avatar: user.photoURL,
    };

    const response = await Axios({
      ...SummaryApi.googleLogin,
      data: payload,
      withCredentials: true,
    });

    if (response.data.error) {
      toast.error(response.data.message);
    }

    if (response.data.success) {
      toast.success(response.data.message);
      await checkUser();

      const redirectTo =
        new URLSearchParams(link).get("redirect") || "/home";
      navigate(redirectTo);
    }
  } catch (error: any) {
    console.error("Google login error:", error);
    AxiosToastError(error);
  }
};