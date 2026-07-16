package com.santhosh.jobportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SavedJobResponse {

    private Integer savedJobId;

    private Integer jobId;

    private String title;

    private String company;

    private String location;

    private Double salary;

    private Integer experience;

    private String jobType;

    private String skills;

    private LocalDate postedDate;

    private LocalDate savedDate;

}