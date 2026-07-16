package com.santhosh.jobportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecentJobResponse {

    private Integer id;

    private String title;

    private String company;

    private Long applicants;

}