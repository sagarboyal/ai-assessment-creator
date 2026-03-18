package com.sagarboyal.aiassessment.module.assessment.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionTypeConfig {
    private String type;
    private Integer numberOfQuestions;
    private Integer marksPerQuestion;
}