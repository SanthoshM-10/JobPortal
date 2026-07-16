package com.santhosh.jobportal.dto;

import lombok.Data;

@Data
public class RecentJobDTO {
    private Integer id;
    private String title;
    private String company;
    private Long applicants;
}
