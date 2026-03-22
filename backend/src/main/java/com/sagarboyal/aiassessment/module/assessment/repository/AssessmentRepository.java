package com.sagarboyal.aiassessment.module.assessment.repository;

import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AssessmentRepository extends MongoRepository<Assessment, String> {
    Page<Assessment> findByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Assessment> findByDueDateBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<Assessment> findByTitleContainingIgnoreCaseAndDueDateBetween(
            String title,
            LocalDateTime start,
            LocalDateTime end,
            Pageable pageable
    );
}
