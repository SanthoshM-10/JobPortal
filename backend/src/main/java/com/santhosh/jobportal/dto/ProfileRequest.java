package com.santhosh.jobportal.dto;

import lombok.Data;

@Data
public class ProfileRequest {

    private String phone;

    private String location;

    private String skills;

    private String education;

    private String experience;

    private String linkedin;

    private String github;

}