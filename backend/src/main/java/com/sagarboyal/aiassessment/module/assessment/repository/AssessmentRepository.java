package com.sagarboyal.aiassessment.module.assessment.repository;

import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentRepository extends MongoRepository<Assessment, String> {
}
