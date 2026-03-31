package com.smartcampus.auth.controller;

import com.smartcampus.auth.dto.AuthMeResponse;
import com.smartcampus.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public ResponseEntity<AuthMeResponse> me(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        return ResponseEntity.ok(authService.getCurrentUser(email));
    }
}
