package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/resume")
@RequiredArgsConstructor
@CrossOrigin
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file")MultipartFile file){
        String message = resumeService.uploadResume(file);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> downloadResume(
            @PathVariable String filename) throws Exception {

        return resumeService.downloadResume(filename);

    }

    @GetMapping("/my")
    public ResponseEntity<String> getMyResume() {

        return ResponseEntity.ok(
                resumeService.getMyResume()
        );

    }
}
