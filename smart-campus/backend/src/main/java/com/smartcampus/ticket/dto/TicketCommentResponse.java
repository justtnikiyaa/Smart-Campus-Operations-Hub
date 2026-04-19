package com.smartcampus.ticket.dto;

import java.time.LocalDateTime;

public record TicketCommentResponse(
        Long id,
        Long ticketId,
        Long commenterUserId,
        String message,
        LocalDateTime createdAt
) {
}
