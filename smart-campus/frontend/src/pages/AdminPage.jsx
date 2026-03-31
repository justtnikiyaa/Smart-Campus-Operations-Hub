import AppLayout from "../components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BellRing, ShieldCheck, Users2 } from "lucide-react";

export default function AdminPage() {
  return (
    <AppLayout title="Admin">
      <div className="space-y-4">
        <Card className="border-slate-200/80 bg-white/90 backdrop-blur-sm dark:border-cyan-300/20 dark:bg-[#111a2d]/90">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Admin Controls</CardTitle>
            <CardDescription>
              Manage operations, send notifications, and monitor system-level updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-blue-100 p-2 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                  <BellRing className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notification broadcast</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Send campus-wide alerts and notices.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                  <Users2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">User oversight</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Track user activity and role assignment health.</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/85 p-3 dark:border-cyan-300/15 dark:bg-[#0d1628]">
                <div className="mb-2 inline-flex rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Security status</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Keep role-based access and permissions clean.</p>
              </div>
            </div>

            <Button>Send Campus Alert</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
