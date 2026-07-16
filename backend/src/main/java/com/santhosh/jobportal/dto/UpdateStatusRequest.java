package com.santhosh.jobportal.dto;

import com.santhosh.jobportal.enums.ApplicationStatus;
import lombok.Data;

@Data
public class UpdateStatusRequest {

    private ApplicationStatus status;
}
