package com.sagarboyal.aiassessment.module.question.service;

import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
import com.sagarboyal.aiassessment.module.question.payload.QuestionGenerationEvent;
import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class QuestionGenerationPublisher {
    private final SimpMessagingTemplate messagingTemplate;

    public void publish(String assessmentId, AssessmentStatus status, String message, QuestionPaperResponse questionPaper) {
        QuestionGenerationEvent event = QuestionGenerationEvent.builder()
                .assessmentId(assessmentId)
                .status(status)
                .message(message)
                .questionPaper(questionPaper)
                .build();

        messagingTemplate.convertAndSend(topicFor(assessmentId), event);
    }

    public static String topicFor(String assessmentId) {
        return "/topic/questions/" + assessmentId;
    }
}
