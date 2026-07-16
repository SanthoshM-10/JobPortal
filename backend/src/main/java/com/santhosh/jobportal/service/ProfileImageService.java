package com.santhosh.jobportal.service;

import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileImageService {

    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/profile-images/";

    public String uploadProfileImage(MultipartFile file) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            String email = authentication.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            File directory = new File(UPLOAD_DIR);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filename =
                    UUID.randomUUID() + "_" + file.getOriginalFilename();

            File destination = new File(directory, filename);

            file.transferTo(destination.getAbsoluteFile());

            user.setProfileImage(filename);

            userRepository.save(user);

            return "Profile image uploaded successfully.";

        } catch (Exception e) {

            e.printStackTrace();

            return e.getMessage();

        }

    }

    public String getMyProfileImage() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getProfileImage();

    }

    public ResponseEntity<Resource> downloadProfileImage(String filename) {

        File file = new File(UPLOAD_DIR + filename);

        if (!file.exists()) {
            throw new RuntimeException("Profile image not found.");
        }

        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + filename + "\"")
                .body(resource);

    }

}