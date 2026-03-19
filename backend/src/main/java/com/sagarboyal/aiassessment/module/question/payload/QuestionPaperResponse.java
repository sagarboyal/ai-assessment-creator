package com.sagarboyal.aiassessment.module.question.payload;

import com.sagarboyal.aiassessment.module.question.model.Question;
import com.sagarboyal.aiassessment.module.question.model.Section;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionPaperResponse {
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
    private LocalDateTime createdAt;
}