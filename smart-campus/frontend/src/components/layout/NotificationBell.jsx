import { useEffect, useMemo, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { notifications as seedNotifications } from "../../data/notifications";
import { Button } from "../ui/button";
import NotificationPanel from "../notifications/NotificationPanel";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(seedNotifications);
  const containerRef = useRef(null);

  const unreadCount = useMemo(() => items.filter((n) => n.unread).length, [items]);

  const toggleOpen = () => {
    if (!open) {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
    setOpen((prev) => !prev);
  };

  const onMarkRead = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  };

  const onDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  useEffect(() => {
    function onDocClick(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", onDocClick);
    }

    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleOpen}
        className="relative h-8 w-8 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
      >
        <Bell className="h-3.5 w-3.5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-blue-500 px-1 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            {unreadCount}
          </span>
        )}
      </Button>

      <NotificationPanel
        open={open}
        loading={loading}
        notifications={items}
        unreadCount={unreadCount}
        onClose={() => setOpen(false)}
        onMarkAllRead={onMarkAllRead}
        onMarkRead={onMarkRead}
        onDelete={onDelete}
      />
    </div>
  );
}

