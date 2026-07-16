package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.service.ProfileImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile/image")
@RequiredArgsConstructor
@CrossOrigin
public class ProfileImageController {

    private final ProfileImageService profileImageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadProfileImage(
            @RequestParam("file") MultipartFile file) {

        return ResponseEntity.ok(
                profileImageService.uploadProfileImage(file)
        );

    }

    @GetMapping("/my")
    public ResponseEntity<String> getMyProfileImage() {

        return ResponseEntity.ok(
                profileImageService.getMyProfileImage()
        );

    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> downloadProfileImage(
            @PathVariable String filename) {

        return profileImageService.downloadProfileImage(filename);

    }

}