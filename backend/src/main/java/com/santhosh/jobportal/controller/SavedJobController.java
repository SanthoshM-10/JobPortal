package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.dto.SavedJobResponse;
import com.santhosh.jobportal.service.SavedJobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/saved-jobs")
@CrossOrigin
public class SavedJobController {

    private final SavedJobService savedJobService;

    public SavedJobController(SavedJobService savedJobService) {
        this.savedJobService = savedJobService;
    }

    // Save a Job
    @PostMapping("/{jobId}")
    public ResponseEntity<SavedJobResponse> saveJob(
            @PathVariable Integer jobId,
            Authentication authentication
    ) {

        SavedJobResponse response =
                savedJobService.saveJob(jobId, authentication);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Remove Saved Job
    @DeleteMapping("/{jobId}")
    public ResponseEntity<String> removeSavedJob(
            @PathVariable Integer jobId,
            Authentication authentication
    ) {

        savedJobService.removeSavedJob(jobId, authentication);

        return ResponseEntity.ok("Saved job removed successfully.");

    }

    // My Saved Jobs
    @GetMapping
    public ResponseEntity<List<SavedJobResponse>> getSavedJobs(
            Authentication authentication
    ) {

        List<SavedJobResponse> response =
                savedJobService.getSavedJobs(authentication);

        return ResponseEntity.ok(response);

    }

    // Check if job is already saved
    @GetMapping("/check/{jobId}")
    public ResponseEntity<Boolean> isSaved(
            @PathVariable Integer jobId,
            Authentication authentication
    ) {

        boolean response =
                savedJobService.isSaved(jobId, authentication);

        return ResponseEntity.ok(response);

    }

}