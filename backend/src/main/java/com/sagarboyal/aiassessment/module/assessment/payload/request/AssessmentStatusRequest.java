package com.sagarboyal.aiassessment.module.assessment.payload.request;

import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class AssessmentStatusRequest {
    @NotBlank(message = "assessment id required")
    private String assessmentId;

    @NotNull(message = "status should be PROCESSING | COMPLETED | FAILED")
    private AssessmentStatus status;
}
