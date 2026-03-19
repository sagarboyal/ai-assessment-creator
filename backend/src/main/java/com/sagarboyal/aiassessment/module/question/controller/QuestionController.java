package com.sagarboyal.aiassessment.module.question.controller;

import com.sagarboyal.aiassessment.common.payload.ApiResponse;
import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionPaperService questionService;

    @PostMapping("/{id}/generate")
    public ResponseEntity<ApiResponse<QuestionPaperResponse>> generateQuestionPaper(
            @PathVariable String id) {
        QuestionPaperResponse response = questionService.createQuestionPaper(id);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Question paper generated successfully", response));
    }

    @GetMapping("/assessment/{assessmentId}")
    public ResponseEntity<ApiResponse<QuestionPaperResponse>> getByAssessmentId(
            @PathVariable String assessmentId) {
        QuestionPaperResponse response = questionService.getByAssessmentId(assessmentId);
        return ResponseEntity.ok(ApiResponse.success("Question paper fetched successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<QuestionPaperResponse>> getById(
            @PathVariable String id) {
        QuestionPaperResponse response = questionService.getById(id);
        return ResponseEntity.ok(ApiResponse.success("Question paper fetched successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteById(@PathVariable String id) {
        questionService.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Question paper deleted successfully", null));
    }

    @DeleteMapping("/assessment/{assessmentId}")
    public ResponseEntity<ApiResponse<Void>> deleteByAssessmentId(@PathVariable String assessmentId) {
        questionService.deleteByAssessmentId(assessmentId);
        return ResponseEntity.ok(ApiResponse.success("Question paper deleted successfully", null));
    }
}