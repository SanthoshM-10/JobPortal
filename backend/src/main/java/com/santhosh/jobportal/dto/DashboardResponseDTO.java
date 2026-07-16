package com.santhosh.jobportal.dto;


import lombok.Data;

@Data
public class DashboardResponseDTO {

    private Long totalJobs;

    private Long acceptedApplications;

    private Long rejectedApplications;

    private Long pendingApplications;
}
