package com.smartcampus.auth.controller;

import com.smartcampus.auth.dto.AuthMeResponse;
import com.smartcampus.auth.service.AuthService;
import com.smartcampus.user.entity.User;
import com.smartcampus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<AuthMeResponse> me(Authentication authentication) {
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof OAuth2User oauth2User)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = toStringValue(oauth2User.getAttribute("email"));
        if (email == null || email.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Fail-safe: ensure user exists in DB even if first OAuth callback had an issue.
        String googleId = toStringValue(oauth2User.getAttribute("sub"));
        String fullName = toStringValue(oauth2User.getAttribute("name"));
        String pictureUrl = toStringValue(oauth2User.getAttribute("picture"));

        User user = userService.findOrCreateGoogleUser(
                googleId == null ? "" : googleId,
                email,
                fullName == null || fullName.isBlank() ? "Google User" : fullName,
                pictureUrl
        );

        return ResponseEntity.ok(authService.toAuthMeResponse(user));
    }

    private String toStringValue(Object value) {
        return value == null ? null : value.toString();
    }
}
