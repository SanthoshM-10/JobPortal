package com.santhosh.jobportal.service;

import com.santhosh.jobportal.dto.ApplicantResponse;
import com.santhosh.jobportal.dto.ApplicationResponse;
import com.santhosh.jobportal.dto.ApplyJobRequest;
import com.santhosh.jobportal.dto.UpdateStatusRequest;
import com.santhosh.jobportal.enums.ApplicationStatus;
import com.santhosh.jobportal.model.Application;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.ApplicationRepository;
import com.santhosh.jobportal.repository.JobRepository;
import com.santhosh.jobportal.repository.UserRepository;
import jakarta.validation.constraints.Email;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              EmailService emailService) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public ApplicationResponse applyForJob(ApplyJobRequest request,
                                           Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.findByUserAndJob(user, job).isPresent()) {
            throw new RuntimeException("You have already applied for this job.");
        }

        Application application = new Application();

        application.setUser(user);
        application.setJob(job);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedDate(LocalDate.now());

        Application savedApplication =
                applicationRepository.save(application);

        ApplicationResponse response = new ApplicationResponse();

        response.setApplicationId(savedApplication.getId());
        response.setJobId(job.getId());
        response.setJobTitle(job.getTitle());
        response.setCompany(job.getCompany());
        response.setStatus(savedApplication.getStatus());
        response.setAppliedDate(savedApplication.getAppliedDate());

        return response;
    }

    public List<ApplicationResponse> getMyApplications(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Application> applications =
                applicationRepository.findByUser(user);

        return applications.stream().map(application -> {

            ApplicationResponse response = new ApplicationResponse();

            response.setApplicationId(application.getId());
            response.setJobId(application.getJob().getId());
            response.setJobTitle(application.getJob().getTitle());
            response.setCompany(application.getJob().getCompany());
            response.setStatus(application.getStatus());
            response.setAppliedDate(application.getAppliedDate());

            return response;

        }).toList();
    }

    public List<ApplicantResponse> getApplicants(Integer jobId) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        List<Application> applications =
                applicationRepository.findByJob(job);

        return applications.stream().map(application -> {

            ApplicantResponse response = new ApplicantResponse();

            response.setApplicationId(application.getId());
            response.setUserId(application.getUser().getId());
            response.setName(application.getUser().getName());
            response.setEmail(application.getUser().getEmail());
            response.setStatus(application.getStatus());
            response.setAppliedDate(application.getAppliedDate());

            response.setResumeUrl(application.getUser().getResumeUrl());

            return response;

        }).toList();
    }

    public ApplicationResponse updateApplicationStatus(
            Integer applicationId,
            UpdateStatusRequest request) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(request.getStatus());

        Application saved = applicationRepository.save(application);

        ApplicationResponse response = new ApplicationResponse();

        response.setApplicationId(saved.getId());
        response.setJobId(saved.getJob().getId());
        response.setJobTitle(saved.getJob().getTitle());
        response.setCompany(saved.getJob().getCompany());
        response.setStatus(saved.getStatus());
        response.setAppliedDate(saved.getAppliedDate());


        String subject = "Job Application Status Updated";

        String body =
                "Hello " + saved.getUser().getName() + ",\n\n" +
                        "Your application for the position '" +
                        saved.getJob().getTitle() +
                        "' at " +
                        saved.getJob().getCompany() +
                        " has been updated.\n\n" +

                        "Current Status : " + saved.getStatus() + "\n\n" +

                        "Thank you for using Job Portal.\n\n" +

                        "Regards,\nRecruitment Team";

        try {

            emailService.sendEmail(
                    saved.getUser().getEmail(),
                    subject,
                    body
            );

        } catch (Exception e) {

            System.out.println("Email sending failed: " + e.getMessage());

        }

        return response;
    }
}