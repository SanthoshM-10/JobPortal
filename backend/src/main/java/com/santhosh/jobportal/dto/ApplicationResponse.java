package com.santhosh.jobportal.dto;

import com.santhosh.jobportal.enums.ApplicationStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ApplicationResponse {

    private Integer applicationId;

    private Integer jobId;

    private String jobTitle;

    private String company;

    private ApplicationStatus status;

    private LocalDate appliedDate;
}
