package com.santhosh.jobportal.service;

import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/resumes/";

    public String uploadResume(MultipartFile file) {

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

            File destination =
                    new File(UPLOAD_DIR + filename);
//
//            System.out.println("Original File: " + file.getOriginalFilename());
//            System.out.println("Is Empty: " + file.isEmpty());
//            System.out.println("Destination: " + destination.getAbsolutePath());

            Files.copy(
                    file.getInputStream(),
                    destination.toPath(),
                    StandardCopyOption.REPLACE_EXISTING
            );

            user.setResumeUrl(filename);

            userRepository.save(user);

            return "Resume uploaded successfully.";

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Resume upload failed: " + e.getMessage(), e);
        }

    }

    public ResponseEntity<Resource> downloadResume(String filename)
            throws IOException {

        Path path = Paths.get(UPLOAD_DIR).resolve(filename);

        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            throw new RuntimeException("Resume not found");
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + filename + "\""
                )
                .body(resource);

    }

    public String getMyResume() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getResumeUrl();

    }

}