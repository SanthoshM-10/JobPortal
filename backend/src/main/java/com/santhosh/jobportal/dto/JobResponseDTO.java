package com.santhosh.jobportal.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class JobResponseDTO {

    private Integer id;
    private String title;
    private String company;
    private String location;
    private Double salary;
    private Integer experience;
    private String jobType;
    private String description;
    private String skills;
    private LocalDate postedDate;
}