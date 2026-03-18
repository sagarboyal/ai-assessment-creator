package com.sagarboyal.aiassessment.module.assessment.payload.request;

import com.sagarboyal.aiassessment.module.assessment.model.QuestionTypeConfig;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Class name is required")
    private String className;

    @NotBlank(message = "School name is required")
    private String schoolName;

    @NotNull(message = "Time allowed is required")
    private Integer timeAllowed;

    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private LocalDateTime dueDate;

    @NotEmpty(message = "At least one question type is required")
    private List<QuestionTypeConfig> questionTypes;

    private String additionalInstructions;
    private String uploadedFileUrl;
}