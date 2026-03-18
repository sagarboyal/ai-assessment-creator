package com.sagarboyal.aiassessment.module.assesment.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "assessments")
public class Assessment {

    @Id
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

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}