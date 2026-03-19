package com.sagarboyal.aiassessment.module.assessment.payload.response;

import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
import com.sagarboyal.aiassessment.module.assessment.model.QuestionTypeConfig;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentResponse {
    private String id;
    private String title;
    private String subject;
    private String className;
    private String schoolName;
    private Integer timeAllowed;
    private LocalDateTime dueDate;
    private List<QuestionTypeConfig> questionTypes;
    private String additionalInstructions;
    private String uploadedFileUrl;
    private AssessmentStatus status;
    private LocalDateTime createdAt;
}