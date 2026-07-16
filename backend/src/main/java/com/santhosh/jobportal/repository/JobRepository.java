package com.santhosh.jobportal.repository;

import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

    @Query("""
        SELECT j FROM Job j
        WHERE
        (:keyword IS NULL OR
            LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.company) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
            OR LOWER(j.skills) LIKE LOWER(CONCAT('%', :keyword, '%'))
        )
        AND
        (:location IS NULL OR LOWER(j.location) = LOWER(:location))
        AND
        (:jobType IS NULL OR LOWER(j.jobType) = LOWER(:jobType))
        """)
    Page<Job> searchJobs(
            @Param("keyword") String keyword,
            @Param("location") String location,
            @Param("jobType") String jobType,
            Pageable pageable
    );

    List<Job> findByCompany(String company);

    List<Job> findByLocation(String location);

    List<Job> findByJobType(String jobType);

    List<Job> findByExperience(Integer experience);

    List<Job> findByRecruiter(User recruiter);

    long countByRecruiter(User recruiter);

    List<Job> findTop5ByRecruiterOrderByPostedDateDesc(User recruiter);

}