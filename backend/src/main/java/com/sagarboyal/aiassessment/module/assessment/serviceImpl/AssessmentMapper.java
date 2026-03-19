package com.sagarboyal.aiassessment.module.assessment.serviceImpl;

import com.sagarboyal.aiassessment.common.utils.StringUtils;
import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.AssessmentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AssessmentMapper {
    private final StringUtils stringUtils;

    public Assessment toEntity(AssessmentRequest request) {
        return Assessment.builder()
                .title(clean(request.getTitle()))
                .subject(clean(request.getSubject()))
                .className(clean(request.getClassName()))
                .schoolName(clean(request.getSchoolName()))
                .timeAllowed(request.getTimeAllowed())
                .dueDate(request.getDueDate())
                .questionTypes(request.getQuestionTypes())
                .additionalInstructions(clean(request.getAdditionalInstructions()))
                .uploadedFileUrl(clean(request.getUploadedFileUrl()))
                .status(AssessmentStatus.PENDING)
                .build();
    }

    public AssessmentResponse toResponse(Assessment assessment) {
        return AssessmentResponse.builder()
                .id(assessment.getId())
                .title(assessment.getTitle())
                .subject(assessment.getSubject())
                .className(assessment.getClassName())
                .schoolName(assessment.getSchoolName())
                .timeAllowed(assessment.getTimeAllowed())
                .dueDate(assessment.getDueDate())
                .questionTypes(assessment.getQuestionTypes())
                .additionalInstructions(assessment.getAdditionalInstructions())
                .uploadedFileUrl(assessment.getUploadedFileUrl())
                .status(assessment.getStatus())
                .createdAt(assessment.getCreatedAt())
                .build();
    }

    private String clean(String text) {
        return stringUtils.clean(text);
    }
}
