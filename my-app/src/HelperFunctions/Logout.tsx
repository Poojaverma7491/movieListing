import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

export const useAuthActions = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", { method: "GET", credentials: "include" });
      setUser(null);
      toast.success("You have been logged out.");
      navigate("/home");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  return { logout };
};
export default useAuthActions