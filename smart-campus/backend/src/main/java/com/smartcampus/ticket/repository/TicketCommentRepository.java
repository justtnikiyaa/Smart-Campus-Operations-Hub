package com.smartcampus.ticket.repository;

import com.smartcampus.ticket.entity.TicketComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketCommentRepository extends JpaRepository<TicketComment, Long> {
}
