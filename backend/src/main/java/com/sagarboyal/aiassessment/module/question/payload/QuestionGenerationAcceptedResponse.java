package com.sagarboyal.aiassessment.module.question.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionGenerationAcceptedResponse {
    private String assessmentId;
    private String status;
    private String topic;
}
