package com.santhosh.jobportal.dto;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {

    private Long totalJobs;

    private Long totalApplicants;

    private Long applied;

    private Long shortlisted;

    private Long selected;

    private Long rejected;

    private Long interview;

    private List<RecentJobResponse> recentJobs;
}
