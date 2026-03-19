package com.sagarboyal.aiassessment.module.question.model;

import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    private Integer questionNumber;
    private String questionText;
    private List<String> options;
    private String answer;
    private DifficultyLevel difficulty;
    private Integer marks;
    private String type;
}