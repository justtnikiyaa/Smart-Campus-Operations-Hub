package com.smartcampus.ticket.service;

import com.smartcampus.common.exception.ResourceNotFoundException;
import com.smartcampus.notification.service.NotificationService;
import com.smartcampus.ticket.dto.TicketCommentResponse;
import com.smartcampus.ticket.dto.TicketResponse;
import com.smartcampus.ticket.entity.Ticket;
import com.smartcampus.ticket.entity.TicketComment;
import com.smartcampus.ticket.entity.TicketStatus;
import com.smartcampus.ticket.repository.TicketCommentRepository;
import com.smartcampus.ticket.repository.TicketRepository;
import com.smartcampus.user.entity.User;
import com.smartcampus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final TicketCommentRepository ticketCommentRepository;
    private final UserService userService;
    private final NotificationService notificationService;

    @Transactional
    public TicketResponse createTicket(String ownerEmail, String subject, String description) {
        User owner = userService.getByEmailOrThrow(ownerEmail);

        Ticket ticket = new Ticket();
        ticket.setOwner(owner);
        ticket.setSubject(subject);
        ticket.setDescription(description);
        ticket.setStatus(TicketStatus.OPEN);
        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        return toResponse(ticketRepository.save(ticket));
    }

    @Transactional
    public TicketResponse updateTicketStatus(Long ticketId, TicketStatus newStatus) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found."));

        ticket.setStatus(newStatus);
        ticket.setUpdatedAt(LocalDateTime.now());
        Ticket saved = ticketRepository.save(ticket);

        // Notification hook: after status update succeeds, notify ticket owner.
        notificationService.createTicketStatusChangedNotification(
                saved.getOwner().getId(),
                saved.getId(),
                saved.getStatus().name()
        );

        return toResponse(saved);
    }

    @Transactional
    public TicketCommentResponse addComment(Long ticketId, String commenterEmail, String message) {
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found."));

        User commenter = userService.getByEmailOrThrow(commenterEmail);

        TicketComment comment = new TicketComment();
        comment.setTicket(ticket);
        comment.setCommenter(commenter);
        comment.setMessage(message);
        comment.setCreatedAt(LocalDateTime.now());

        TicketComment savedComment = ticketCommentRepository.save(comment);

        // Notify owner only if someone else commented.
        if (!savedComment.getCommenter().getId().equals(ticket.getOwner().getId())) {
            notificationService.createNewCommentNotification(
                    ticket.getOwner().getId(),
                    ticket.getId(),
                    savedComment.getId()
            );
        }

        return toCommentResponse(savedComment);
    }

    private TicketResponse toResponse(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getSubject(),
                ticket.getDescription(),
                ticket.getStatus(),
                ticket.getOwner().getId(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt()
        );
    }

    private TicketCommentResponse toCommentResponse(TicketComment comment) {
        return new TicketCommentResponse(
                comment.getId(),
                comment.getTicket().getId(),
                comment.getCommenter().getId(),
                comment.getMessage(),
                comment.getCreatedAt()
        );
    }
}
