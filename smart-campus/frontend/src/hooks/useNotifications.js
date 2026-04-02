import { useEffect, useMemo, useState } from "react";
import notificationService from "../services/notificationService";

export default function useNotifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await notificationService.getMyNotifications();
        if (active) setItems(data);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return useMemo(
    () => ({
      items,
      loading,
      unreadCount: items.filter((item) => item.unread).length
    }),
    [items, loading]
  );
}
