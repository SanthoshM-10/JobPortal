package com.santhosh.jobportal.repository;

import com.santhosh.jobportal.enums.ApplicationStatus;
import com.santhosh.jobportal.model.Application;
import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findByUser(User user);

    List<Application> findByJob(Job job);

    Optional<Application> findByUserAndJob(User user, Job job);


    @Modifying
    @Transactional
    void deleteByJob(Job job);

    long countByJobRecruiter(User recruiter);

    long countByJobRecruiterAndStatus(
            User recruiter,
            ApplicationStatus status
    );
}
