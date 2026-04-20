package com.smartcampus.notification.controller;

import com.smartcampus.notification.dto.CreateNotificationRequest;
import com.smartcampus.notification.dto.NotificationResponse;
import com.smartcampus.notification.dto.UnreadCountResponse;
import com.smartcampus.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/my")
    public ResponseEntity<List<NotificationResponse>> getMyNotifications(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        return ResponseEntity.ok(notificationService.getMyNotifications(email));
    }

    @GetMapping("/my/unread-count")
    public ResponseEntity<UnreadCountResponse> getMyUnreadCount(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        return ResponseEntity.ok(notificationService.getMyUnreadCount(email));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markRead(
            @PathVariable Long id,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String email = principal.getAttribute("email");
        return ResponseEntity.ok(notificationService.markAsRead(id, email));
    }

    @PatchMapping("/my/read-all")
    public ResponseEntity<Void> markAllRead(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        notificationService.markAllAsRead(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(
            @Valid @RequestBody CreateNotificationRequest request,
            @AuthenticationPrincipal OAuth2User principal
    ) {
        String adminEmail = principal.getAttribute("email");
        NotificationResponse response = notificationService.createNotification(request, adminEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationResponse> getNotificationById(@PathVariable Long id) {
        return ResponseEntity.ok(notificationService.getNotificationById(id));
    }
}
