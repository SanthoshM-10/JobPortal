package com.santhosh.jobportal.service;

import com.santhosh.jobportal.dto.SavedJobResponse;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.SavedJob;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.JobRepository;
import com.santhosh.jobportal.repository.SavedJobRepository;
import com.santhosh.jobportal.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SavedJobService {

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public SavedJobService(
            SavedJobRepository savedJobRepository,
            JobRepository jobRepository,
            UserRepository userRepository
    ) {
        this.savedJobRepository = savedJobRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // Save Job
    public SavedJobResponse saveJob(
            Integer jobId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        if (savedJobRepository.existsByUserAndJob(user, job)) {
            throw new RuntimeException("Job already saved.");
        }

        SavedJob savedJob = new SavedJob();

        savedJob.setUser(user);
        savedJob.setJob(job);
        savedJob.setSavedDate(LocalDate.now());

        SavedJob saved = savedJobRepository.save(savedJob);

        return convertToResponse(saved);

    }

    // Remove Saved Job
    public void removeSavedJob(
            Integer jobId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        SavedJob savedJob = savedJobRepository
                .findByUserAndJob(user, job)
                .orElseThrow(() ->
                        new RuntimeException("Saved job not found"));

        savedJobRepository.delete(savedJob);

    }

    // Get My Saved Jobs
    public List<SavedJobResponse> getSavedJobs(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<SavedJob> savedJobs =
                savedJobRepository.findByUser(user);

        return savedJobs.stream()
                .map(this::convertToResponse)
                .toList();

    }

    // Check Saved
    public boolean isSaved(
            Integer jobId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        return savedJobRepository.existsByUserAndJob(user, job);

    }

    // DTO Mapper
    private SavedJobResponse convertToResponse(
            SavedJob savedJob
    ) {

        SavedJobResponse response = new SavedJobResponse();

        response.setSavedJobId(savedJob.getId());

        response.setJobId(savedJob.getJob().getId());

        response.setTitle(savedJob.getJob().getTitle());

        response.setCompany(savedJob.getJob().getCompany());

        response.setLocation(savedJob.getJob().getLocation());

        response.setSalary(savedJob.getJob().getSalary());

        response.setExperience(savedJob.getJob().getExperience());

        response.setJobType(savedJob.getJob().getJobType());

        response.setSkills(savedJob.getJob().getSkills());

        response.setPostedDate(savedJob.getJob().getPostedDate());

        response.setSavedDate(savedJob.getSavedDate());

        return response;

    }

}