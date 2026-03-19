package com.sagarboyal.aiassessment.module.question.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sagarboyal.aiassessment.module.question.model.QuestionPaper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class QuestionPaperParser {

    private final ObjectMapper objectMapper;

    public QuestionPaper parse(String jsonResponse, String assessmentId) {
        try {
            String cleaned = cleanResponse(jsonResponse);
            QuestionPaper paper = objectMapper.readValue(cleaned, QuestionPaper.class);
            paper.setAssessmentId(assessmentId);
            if (paper.getGeneralInstruction() == null || paper.getGeneralInstruction().isBlank()) {
                paper.setGeneralInstruction("All questions are compulsory unless stated otherwise.");
            }
            return paper;
        } catch (Exception e) {
            log.error("Failed to parse Groq response: {}", e.getMessage());
            throw new RuntimeException("Failed to parse AI response into question paper");
        }
    }

    private String cleanResponse(String response) {
        if (response == null || response.isBlank())
            throw new RuntimeException("Empty response from AI");

        String cleaned = response.trim();

        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }

        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(0, cleaned.length() - 3);
        }

        return cleaned.trim();
    }
}