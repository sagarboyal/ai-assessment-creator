package com.sagarboyal.aiassessment.module.question.service;

import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;

public interface QuestionPaperService {
    void validateGenerationRequest(String assessmentId);
    void createQuestionPaperAsync(String assessmentId);
    QuestionPaperResponse createQuestionPaper(String assessmentId);
    QuestionPaperResponse getByAssessmentId(String assessmentId);
    QuestionPaperResponse getById(String id);
    void deleteById(String id);
    void deleteByAssessmentId(String assessmentId);
}
