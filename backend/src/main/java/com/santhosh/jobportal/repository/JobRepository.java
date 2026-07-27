package com.santhosh.jobportal.repository;

import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer>, JpaSpecificationExecutor<Job> {

    List<Job> findByCompany(String company);

    List<Job> findByLocation(String location);

    List<Job> findByJobType(String jobType);

    List<Job> findByExperience(Integer experience);

    List<Job> findByRecruiter(User recruiter);

    long countByRecruiter(User recruiter);

    List<Job> findTop5ByRecruiterOrderByPostedDateDesc(User recruiter);

}