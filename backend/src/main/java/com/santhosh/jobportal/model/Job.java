package com.santhosh.jobportal.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary should be positive")
    private Double salary;

    @NotNull(message = "Experience is required")
    @PositiveOrZero(message = "Experience should be positive")
    private Integer experience;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotBlank(message = "Job description is required")
    private String description;

    @NotBlank(message = "Skills is required")
    private String skills;

    @NotNull(message = "Post date is required")
    private LocalDate postedDate;

}
