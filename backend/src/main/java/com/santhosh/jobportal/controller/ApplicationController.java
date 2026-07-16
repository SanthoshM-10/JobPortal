package com.santhosh.jobportal.controller;

import com.santhosh.jobportal.dto.ApplicantResponse;
import com.santhosh.jobportal.dto.ApplicationResponse;
import com.santhosh.jobportal.dto.ApplyJobRequest;
import com.santhosh.jobportal.dto.UpdateStatusRequest;
import com.santhosh.jobportal.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/applications")
public class ApplicationController {

    private ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService){
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> applyForJob(
            @Valid @RequestBody ApplyJobRequest request,
            Authentication authentication) {

        ApplicationResponse response =
                applicationService.applyForJob(request, authentication);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/my")
    public ResponseEntity<List<ApplicationResponse>> getMyApplication(Authentication authentication){
        List<ApplicationResponse> reponse = applicationService.getMyApplications(authentication);
        return new ResponseEntity<>(reponse, HttpStatus.OK);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicantResponse>> getApplicants(@PathVariable Integer jobId){
        List<ApplicantResponse> response = applicationService.getApplicants(jobId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{applicationId}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Integer applicationId,
            @RequestBody UpdateStatusRequest request) {

        ApplicationResponse response =
                applicationService.updateApplicationStatus(
                        applicationId,
                        request
                );

        return ResponseEntity.ok(response);
    }
}
