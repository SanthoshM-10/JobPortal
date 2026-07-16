package com.santhosh.jobportal.dto;

import lombok.Data;

@Data
public class ResetPasswordRequest {

    private String email;

    private String newPassword;

}