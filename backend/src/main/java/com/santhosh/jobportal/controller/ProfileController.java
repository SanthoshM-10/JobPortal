package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.dto.ProfileRequest;
import com.santhosh.jobportal.dto.ProfileResponse;
import com.santhosh.jobportal.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@CrossOrigin
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyProfile(
            Authentication authentication) {
        System.out.println("===== PROFILE CONTROLLER HIT =====");

        return ResponseEntity.ok(
                profileService.getMyProfile(authentication)
        );
    }

    @PutMapping("/me")
    public ResponseEntity<ProfileResponse> updateProfile(
            @RequestBody ProfileRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                profileService.updateProfile(request, authentication)
        );
    }

}