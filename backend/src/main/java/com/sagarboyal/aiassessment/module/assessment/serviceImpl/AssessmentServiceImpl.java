package com.sagarboyal.aiassessment.module.assessment.serviceImpl;

import com.sagarboyal.aiassessment.common.exception.custom.ResourceNotFoundException;
import com.sagarboyal.aiassessment.common.utils.AppUtils;
import com.sagarboyal.aiassessment.common.utils.StringUtils;
import com.sagarboyal.aiassessment.config.RedisCacheConfig;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentStatusRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentUpdateRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.PagedResponse;
import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import com.sagarboyal.aiassessment.module.assessment.payload.request.AssessmentRequest;
import com.sagarboyal.aiassessment.module.assessment.payload.response.AssessmentResponse;
import com.sagarboyal.aiassessment.module.assessment.repository.AssessmentRepository;
import com.sagarboyal.aiassessment.module.assessment.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Service
@RequiredArgsConstructor
public class AssessmentServiceImpl implements AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final AssessmentMapper mapper;
    private final StringUtils stringUtils;
    private final AppUtils  appUtils;

    @Override
    @CachePut(cacheNames = RedisCacheConfig.ASSESSMENT_CACHE, key = "#result.id")
    public AssessmentResponse createAssessment(AssessmentRequest request) {
        Assessment assessment = mapper.toEntity(request);
        return mapper.toResponse(assessmentRepository.save(assessment));
    }

    @Override
    @CachePut(cacheNames = RedisCacheConfig.ASSESSMENT_CACHE, key = "#result.id")
    public AssessmentResponse updateEntity(AssessmentUpdateRequest request) {
        Assessment existing = findById(request.getId());
        existing.setTitle(
                appUtils.merge(
                        existing.getTitle(),
                        stringUtils.clean(request.getTitle()))
        );
        existing.setSubject(
                appUtils.merge(
                        existing.getSubject(),
                        stringUtils.clean(request.getSubject()))
        );
        existing.setClassName(
                appUtils.merge(
                        existing.getClassName(),
                        stringUtils.clean(request.getClassName()))
        );
        existing.setSchoolName(
                appUtils.merge(
                        existing.getSchoolName(),
                        stringUtils.clean(request.getSchoolName()))
        );
        existing.setTimeAllowed(
                appUtils.merge(existing.getTimeAllowed(),
                        request.getTimeAllowed())
        );
        existing.setDueDate(
                appUtils.merge(
                        existing.getDueDate(),
                        request.getDueDate())
        );
        existing.setQuestionTypes(
                appUtils.merge(
                        existing.getQuestionTypes(),
                        request.getQuestionTypes())
        );
        existing.setAdditionalInstructions(
                appUtils.merge(
                        existing.getAdditionalInstructions(),
                        stringUtils.clean(request.getAdditionalInstructions()))
        );
        existing.setUploadedFileUrl(
                appUtils.merge(
                        existing.getUploadedFileUrl(),
                        stringUtils.clean(request.getUploadedFileUrl()))
        );
        return mapper.toResponse(assessmentRepository.save(existing));
    }

    @Override
    @CachePut(cacheNames = RedisCacheConfig.ASSESSMENT_CACHE, key = "#result.id")
    public AssessmentResponse updateStatus(AssessmentStatusRequest request) {
        Assessment assessment = findById(request.getAssessmentId());
        assessment.setStatus(request.getStatus());
        return mapper.toResponse(assessmentRepository.save(assessment));
    }

    @Override
    @Cacheable(cacheNames = RedisCacheConfig.ASSESSMENT_CACHE, key = "#id")
    public AssessmentResponse getAssessmentById(String id) {
        return mapper.toResponse(assessmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found!")));
    }

    @Override
    public PagedResponse<AssessmentResponse> getAllAssessments(String title, LocalDate dueDate, Integer page, Integer size) {

        int pageNumber = (page == null || page < 0) ? 0 : page;
        int pageSize = (size == null || size <= 0) ? 10 : Math.min(size, 50);

        Pageable pageRequest = PageRequest.of(
                pageNumber,
                pageSize,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        String normalizedTitle = stringUtils.clean(title);
        Page<Assessment> pageData = findFilteredAssessments(normalizedTitle, dueDate, pageRequest);

        Page<AssessmentResponse> responsePage = pageData
                .map(mapper::toResponse);

        return PagedResponse.of(responsePage);
    }

    @Override
    @CacheEvict(cacheNames = RedisCacheConfig.ASSESSMENT_CACHE, key = "#id")
    public void deleteAssessment(String id) {
        Assessment data = findById(id);
        assessmentRepository.delete(data);
    }

    private Assessment findById(String id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found!"));
    }

    private Page<Assessment> findFilteredAssessments(String title, LocalDate dueDate, Pageable pageable) {
        boolean hasTitle = title != null && !title.isBlank();
        boolean hasDueDate = dueDate != null;

        if (hasTitle && hasDueDate) {
            return assessmentRepository.findByTitleContainingIgnoreCaseAndDueDateBetween(
                    title,
                    dueDate.atStartOfDay(),
                    dueDate.plusDays(1).atStartOfDay(),
                    pageable
            );
        }

        if (hasTitle) {
            return assessmentRepository.findByTitleContainingIgnoreCase(title, pageable);
        }

        if (hasDueDate) {
            LocalDateTime start = dueDate.atStartOfDay();
            LocalDateTime end = dueDate.plusDays(1).atStartOfDay();
            return assessmentRepository.findByDueDateBetween(start, end, pageable);
        }

        return assessmentRepository.findAll(pageable);
    }

}
