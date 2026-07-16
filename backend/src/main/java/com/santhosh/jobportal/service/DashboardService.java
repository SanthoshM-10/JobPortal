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

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public DashboardResponse getDashboard() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User recruiter = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        List<Job> jobs = jobRepository.findByRecruiter(recruiter);

        long totalJobs = jobs.size();

        long totalApplicants = 0;
        long applied = 0;
        long shortlisted = 0;
        long selected = 0;
        long rejected = 0;
        long interview = 0;

        for (Job job : jobs) {

            List<Application> applications =
                    applicationRepository.findByJob(job);

            totalApplicants += applications.size();

            for (Application application : applications) {

                switch (application.getStatus()) {

                    case APPLIED -> applied++;

                    case SHORTLISTED -> shortlisted++;

                    case INTERVIEW -> interview++;

                    case SELECTED -> selected++;

                    case REJECTED -> rejected++;
                }

            }

        }

        // Recent Jobs
        List<Job> recentJobs =
                jobRepository.findTop5ByRecruiterOrderByPostedDateDesc(recruiter);

        List<RecentJobResponse> recent = recentJobs.stream()
                .map(job -> {

                    RecentJobResponse dto = new RecentJobResponse();

                    dto.setId(job.getId());
                    dto.setTitle(job.getTitle());
                    dto.setCompany(job.getCompany());

                    dto.setApplicants(
                            (long) applicationRepository.findByJob(job).size()
                    );

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

        System.out.println("Recent Jobs Count: " + recent.size());

        for (RecentJobResponse job : recent) {
            System.out.println(job.getTitle());
        }

        response.setRecentJobs(recent);

        return response;
    }
}