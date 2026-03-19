package com.sagarboyal.aiassessment.module.question.service;

import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;

public interface QuestionPaperService {
    QuestionPaperResponse getByAssessmentId(String assessmentId);
    QuestionPaperResponse getById(String id);
    void deleteById(String id);
    void deleteByAssessmentId(String assessmentId);
}
