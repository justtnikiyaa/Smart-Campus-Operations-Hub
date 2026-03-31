import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function OAuthSuccessPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setUserFromOAuth } = useAuth();

  useEffect(() => {
    const email = params.get("email");
    const fullName = params.get("fullName") || "User";
    const pictureUrl = params.get("pictureUrl") || "";
    const role = params.get("role") === "ADMIN" ? "ADMIN" : "USER";

    if (!email) {
      navigate("/login", { replace: true });
      return;
    }

    setUserFromOAuth({ email, fullName, pictureUrl, role });
    navigate(role === "ADMIN" ? "/admin" : "/dashboard", { replace: true });
  }, [navigate, params, setUserFromOAuth]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-medium text-slate-600 shadow-sm dark:border-cyan-300/20 dark:bg-[#10192d]/90 dark:text-slate-300">
        Finishing Google sign in...
      </div>
    </div>
  );
}
