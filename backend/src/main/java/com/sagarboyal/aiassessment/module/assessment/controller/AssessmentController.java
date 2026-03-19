package com.sagarboyal.aiassessment.module.assessment.controller;

import com.sagarboyal.aiassessment.common.payload.ApiResponse;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentStatusRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentUpdateRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.AssessmentResponse;
import com.sagarboyal.aiassessment.module.assessment.payload.response.PagedResponse;
import com.sagarboyal.aiassessment.module.assessment.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/assessments")
public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<AssessmentResponse>> createAssessment(
            @Valid @RequestBody AssessmentRequest request) {
        AssessmentResponse response = assessmentService.createAssessment(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Assessment created successfully", response));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<AssessmentResponse>> updateAssessment(
            @Valid @RequestBody AssessmentUpdateRequest request) {
        AssessmentResponse response = assessmentService.updateEntity(request);
        return ResponseEntity.ok(ApiResponse.success("Assessment updated successfully", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AssessmentResponse>> getAssessmentById(@PathVariable String id) {
        AssessmentResponse response = assessmentService.getAssessmentById(id);
        return ResponseEntity.ok(ApiResponse.success("Assessment fetched successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<AssessmentResponse>>> getAllAssessments(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size) {
        PagedResponse<AssessmentResponse> response = assessmentService.getAllAssessments(page, size);
        return ResponseEntity.ok(ApiResponse.success("Assessments fetched successfully", response));
    }

    @PatchMapping
    public ResponseEntity<ApiResponse<AssessmentResponse>> updateStatusHandler(
            @Valid @RequestBody AssessmentStatusRequest request){
        AssessmentResponse response = assessmentService.updateStatus(request);
        return ResponseEntity.ok(ApiResponse.success("Assessment status updated successfully", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAssessment(@PathVariable String id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.ok(ApiResponse.success("Assessment deleted successfully", null));
    }
}
