package com.smartcampus.auth.service;

import com.smartcampus.auth.dto.AuthMeResponse;
import com.smartcampus.user.entity.User;
import com.smartcampus.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;

    public AuthMeResponse getCurrentUser(String email) {
        User user = userService.getByEmailOrThrow(email);
        return userService.toAuthMeResponse(user);
    }

    public AuthMeResponse toAuthMeResponse(User user) {
        return userService.toAuthMeResponse(user);
    }
}
