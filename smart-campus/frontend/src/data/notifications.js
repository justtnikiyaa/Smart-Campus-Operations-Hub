export const notifications = [
  {
    id: "n1",
    title: "Booking approved",
    message: "Your lab room booking for tomorrow has been approved.",
    type: "BOOKING_APPROVED",
    time: "5m ago",
    unread: true
  },
  {
    id: "n2",
    title: "Booking rejected",
    message: "Your booking request was rejected due to schedule conflict.",
    type: "BOOKING_REJECTED",
    time: "20m ago",
    unread: true
  },
  {
    id: "n3",
    title: "Ticket status changed",
    message: "Support ticket #248 is now marked as In Progress.",
    type: "TICKET_STATUS_CHANGED",
    time: "1h ago",
    unread: false
  },
  {
    id: "n4",
    title: "New comment",
    message: "Admin added a comment on your maintenance request.",
    type: "NEW_COMMENT",
    time: "Yesterday",
    unread: false
  }
];
