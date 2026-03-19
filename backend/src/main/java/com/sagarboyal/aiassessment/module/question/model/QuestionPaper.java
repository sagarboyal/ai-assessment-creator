package com.sagarboyal.aiassessment.module.question.model;

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
@Document(collection = "question_papers")
public class QuestionPaper {

    @Id
    private String id;
    private String assessmentId;
    private String schoolName;
    private String subject;
    private String className;
    private Integer timeAllowed;
    private Integer totalMarks;
    private List<Section> sections;
    private List<Question> answerKey;
    private String generalInstruction;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}