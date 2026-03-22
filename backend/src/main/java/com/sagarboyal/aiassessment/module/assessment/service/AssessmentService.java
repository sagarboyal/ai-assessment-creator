package com.sagarboyal.aiassessment.module.assessment.service;

import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentStatusRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentUpdateRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.PagedResponse;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.AssessmentResponse;

import java.time.LocalDate;

public interface AssessmentService {
    AssessmentResponse createAssessment(AssessmentRequest request);
    AssessmentResponse updateEntity(AssessmentUpdateRequest request);
    AssessmentResponse updateStatus(AssessmentStatusRequest request);
    AssessmentResponse getAssessmentById(String id);
    PagedResponse<AssessmentResponse> getAllAssessments(String title, LocalDate dueDate, Integer page, Integer size);
    void deleteAssessment(String id);
}
