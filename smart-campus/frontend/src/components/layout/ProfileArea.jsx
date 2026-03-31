import { UserCircle2, ChevronDown } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function ProfileArea() {
  const { user, role } = useAuth();

  return (
    <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/70 px-2 py-1 shadow-sm dark:border-cyan-300/20 dark:bg-[#10203c]/65">
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300/80 bg-slate-100 text-slate-600 dark:border-cyan-300/35 dark:bg-[#0f1d36] dark:text-slate-200">
        <UserCircle2 className="h-4 w-4" />
      </div>

      <div className="leading-tight">
        <p className="max-w-[108px] truncate text-[11px] font-semibold text-slate-900 dark:text-slate-100">{user?.name || "User"}</p>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/25 dark:text-blue-200">
          {role || "USER"}
        </span>
      </div>

      <ChevronDown className="h-3 w-3 text-slate-500 dark:text-slate-400" />
    </div>
  );
}
