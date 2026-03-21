package com.sagarboyal.aiassessment.module.question.payload;

import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
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
public class QuestionGenerationEvent {
    private String assessmentId;
    private AssessmentStatus status;
    private String message;
    private QuestionPaperResponse questionPaper;
}
