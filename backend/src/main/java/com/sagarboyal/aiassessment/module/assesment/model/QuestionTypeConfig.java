package com.sagarboyal.aiassessment.module.assesment.model;

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