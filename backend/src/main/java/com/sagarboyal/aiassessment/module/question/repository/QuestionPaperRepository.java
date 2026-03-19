package com.sagarboyal.aiassessment.module.question.repository;

import com.sagarboyal.aiassessment.module.question.model.QuestionPaper;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionPaperRepository extends MongoRepository<QuestionPaper, String> {
    QuestionPaper findByAssessmentId(String assessmentId);
}
