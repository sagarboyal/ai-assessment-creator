package com.sagarboyal.aiassessment.module.assessment.payload.request;

import com.sagarboyal.aiassessment.module.assessment.model.QuestionTypeConfig;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentUpdateRequest {

    @NotBlank(message = "Id is required")
    private String id;

    private String title;

    private String subject;

    private String className;

    private String schoolName;

    private Integer timeAllowed;

    @Future(message = "Due date must be in the future")
    private LocalDateTime dueDate;

    private List<QuestionTypeConfig> questionTypes;

    private String additionalInstructions;
    private String uploadedFileUrl;
}