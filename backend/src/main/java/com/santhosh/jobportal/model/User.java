package com.santhosh.jobportal.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(name = "resume_url")
    private String resumeUrl;

    private String profileImage;

    private String phone;

    private String location;

    @Column(length = 1000)
    private String skills;

    private String education;

    private String experience;

    private String linkedin;

    private String github;

    private String otp;

    private LocalDateTime otpExpiry;

    private Boolean otpVerified = false;

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<SavedJob> savedJobs;

    public User() {

    }
}