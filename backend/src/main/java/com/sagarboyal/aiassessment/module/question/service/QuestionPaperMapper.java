package com.sagarboyal.aiassessment.module.question.service;

import com.sagarboyal.aiassessment.module.question.model.QuestionPaper;
import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;
import org.springframework.stereotype.Component;

@Component
public class QuestionPaperMapper {

    public QuestionPaperResponse toResponse(QuestionPaper paper) {
        return QuestionPaperResponse.builder()
                .id(paper.getId())
                .assessmentId(paper.getAssessmentId())
                .schoolName(paper.getSchoolName())
                .subject(paper.getSubject())
                .className(paper.getClassName())
                .timeAllowed(paper.getTimeAllowed())
                .totalMarks(paper.getTotalMarks())
                .sections(paper.getSections())
                .answerKey(paper.getAnswerKey())
                .createdAt(paper.getCreatedAt())
                .build();
    }
}