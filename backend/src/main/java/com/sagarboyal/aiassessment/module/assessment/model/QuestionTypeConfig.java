package com.sagarboyal.aiassessment.module.assessment.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionTypeConfig {
    @NotBlank(message = "Question type is required")
    private String type;

    @JsonAlias("questionCount")
    @NotNull(message = "numberOfQuestions is required")
    @Min(value = 1, message = "numberOfQuestions must be at least 1")
    private Integer numberOfQuestions;

    @JsonAlias("marks")
    @NotNull(message = "marksPerQuestion is required")
    @Min(value = 1, message = "marksPerQuestion must be at least 1")
    private Integer marksPerQuestion;
}
