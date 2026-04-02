const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || `${window.location.protocol}//${window.location.hostname}:8080`;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (response.redirected || response.status === 401) {
    throw new Error("Please sign in again.");
  }

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data?.message || data?.error || message;
    } catch {
      // ignore non-json error body
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function formatRelativeTime(value) {
  if (!value) return "Just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

function toUiNotification(item) {
  return {
    id: item.id,
    title: item.title,
    message: item.message,
    type: item.type,
    unread: Boolean(item.unread),
    createdAt: item.createdAt,
    time: formatRelativeTime(item.createdAt)
  };
}

const notificationService = {
  getMyNotifications: async () => {
    const data = await request("/api/notifications/my", { method: "GET" });
    return (data || []).map(toUiNotification);
  },

  getUnreadCount: async () => {
    const data = await request("/api/notifications/my/unread-count", { method: "GET" });
    return Number(data?.unreadCount || 0);
  },

  markRead: async (id) => {
    const data = await request(`/api/notifications/${id}/read`, { method: "PATCH" });
    return toUiNotification(data);
  },

  markAllRead: async () => {
    await request("/api/notifications/my/read-all", { method: "PATCH" });
    return { ok: true };
  }
};

export default notificationService;
