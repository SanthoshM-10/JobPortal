package com.santhosh.jobportal.dto;

import com.santhosh.jobportal.enums.ApplicationStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ApplicantResponse {

    private Integer applicationId;

    private Integer userId;

    private String name;

    private String email;

    private ApplicationStatus status;

    private LocalDate appliedDate;

    private String resumeUrl;
}
