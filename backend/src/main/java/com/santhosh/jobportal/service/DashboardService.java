package com.santhosh.jobportal.service;

import com.santhosh.jobportal.dto.DashboardResponse;
import com.santhosh.jobportal.dto.RecentJobResponse;
import com.santhosh.jobportal.model.Application;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import com.santhosh.jobportal.repository.ApplicationRepository;
import com.santhosh.jobportal.repository.JobRepository;
import com.santhosh.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public DashboardResponse getDashboard() {

        long totalStart = System.currentTimeMillis();

        long start = System.currentTimeMillis();
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();


        start = System.currentTimeMillis();
        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Recruiter not found"));


        start = System.currentTimeMillis();
        List<Job> jobs = jobRepository.findByRecruiter(recruiter);


        long totalJobs = jobs.size();

        start = System.currentTimeMillis();
        List<Application> applications = applicationRepository.findByJobIn(jobs);


        long totalApplicants = applications.size();

        start = System.currentTimeMillis();

        long applied = 0;
        long shortlisted = 0;
        long interview = 0;
        long selected = 0;
        long rejected = 0;

        Map<Integer, Long> applicantCountMap = new HashMap<>();

        for (Application application : applications) {

            int jobId = application.getJob().getId();

            applicantCountMap.put(
                    jobId,
                    applicantCountMap.getOrDefault(jobId, 0L) + 1
            );

            switch (application.getStatus()) {
                case APPLIED -> applied++;
                case SHORTLISTED -> shortlisted++;
                case INTERVIEW -> interview++;
                case SELECTED -> selected++;
                case REJECTED -> rejected++;
            }
        }


        start = System.currentTimeMillis();
        List<Job> recentJobs =
                jobRepository.findTop5ByRecruiterOrderByPostedDateDesc(recruiter);

        start = System.currentTimeMillis();

        List<RecentJobResponse> recent = recentJobs.stream()
                .map(job -> {

                    RecentJobResponse dto = new RecentJobResponse();

                    dto.setId(job.getId());
                    dto.setTitle(job.getTitle());
                    dto.setCompany(job.getCompany());
                    dto.setApplicants(applicantCountMap.getOrDefault(job.getId(), 0L));

                    return dto;
                })
                .toList();


        DashboardResponse response = new DashboardResponse();

        response.setTotalJobs(totalJobs);
        response.setTotalApplicants(totalApplicants);
        response.setApplied(applied);
        response.setShortlisted(shortlisted);
        response.setInterview(interview);
        response.setSelected(selected);
        response.setRejected(rejected);
        response.setRecentJobs(recent);


        return response;
    }
}