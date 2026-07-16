package com.santhosh.jobportal.repository;

import com.santhosh.jobportal.model.Job;
import com.santhosh.jobportal.model.SavedJob;
import com.santhosh.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Integer> {

    List<SavedJob> findByUser(User user);

    Optional<SavedJob> findByUserAndJob(User user, Job job);

    void deleteByUserAndJob(User user, Job job);

    boolean existsByUserAndJob(User user, Job job);

}