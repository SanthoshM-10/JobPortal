package com.santhosh.jobportal.specification;

import com.santhosh.jobportal.model.Job;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class JobSpecification {

    public static Specification<Job> searchJobs(
            String keyword,
            String location,
            String jobType
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (keyword != null && !keyword.isBlank()) {

                String search = "%" + keyword.toLowerCase() + "%";

                predicates.add(
                        cb.or(
                                cb.like(cb.lower(root.get("title")), search),
                                cb.like(cb.lower(root.get("company")), search),
                                cb.like(cb.lower(root.get("description")), search),
                                cb.like(cb.lower(root.get("skills")), search)
                        )
                );
            }

            if (location != null && !location.isBlank()) {
                predicates.add(
                        cb.equal(
                                cb.lower(root.get("location")),
                                location.toLowerCase()
                        )
                );
            }

            if (jobType != null && !jobType.isBlank()) {
                predicates.add(
                        cb.equal(
                                cb.lower(root.get("jobType")),
                                jobType.toLowerCase()
                        )
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}