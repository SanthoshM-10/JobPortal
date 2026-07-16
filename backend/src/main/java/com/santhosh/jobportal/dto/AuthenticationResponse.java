package com.santhosh.jobportal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticationResponse {

    private String token;
    private String name;
    private String email;
    private String role;
}