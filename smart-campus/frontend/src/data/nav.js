import {
  Bell,
  LayoutDashboard,
  ShieldCheck,
  Settings,
  UserCircle,
  Package
} from "lucide-react";

export const navByRole = {
  USER: [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Resources", to: "/resources", icon: Package },
    { label: "Notifications", to: "/notifications", icon: Bell },
    { label: "Profile", to: "/dashboard", icon: UserCircle }
  ],
  ADMIN: [
    { label: "Dashboard", to: "/admin", icon: ShieldCheck },
    { label: "Resources", to: "/resources", icon: Package },
    { label: "Notifications", to: "/admin/notifications", icon: Bell },
    { label: "Settings", to: "/settings/notifications", icon: Settings }
  ]
};
