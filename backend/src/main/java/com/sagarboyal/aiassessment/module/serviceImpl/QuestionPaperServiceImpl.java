package com.sagarboyal.aiassessment.module.serviceImpl;

import com.sagarboyal.aiassessment.common.exception.custom.ResourceNotFoundException;
import com.sagarboyal.aiassessment.module.question.model.QuestionPaper;
import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;
import com.sagarboyal.aiassessment.module.question.repository.QuestionPaperRepository;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperMapper;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionPaperServiceImpl implements QuestionPaperService {
    private final QuestionPaperRepository questionPaperRepository;
    private final QuestionPaperMapper mapper;

    @Override
    public QuestionPaperResponse getByAssessmentId(String assessmentId) {
        QuestionPaper paper = questionPaperRepository.findByAssessmentId(assessmentId);
        if (paper == null)
            throw new ResourceNotFoundException("Question paper not found for assessment id: " + assessmentId);
        return mapper.toResponse(paper);
    }

    @Override
    public QuestionPaperResponse getById(String id) {
        QuestionPaper paper = questionPaperRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question paper not found with id: " + id));
        return mapper.toResponse(paper);
    }

    @Override
    public void deleteById(String id) {
        QuestionPaper paper = questionPaperRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question paper not found with id: " + id));
        questionPaperRepository.delete(paper);
    }

    @Override
    public void deleteByAssessmentId(String assessmentId) {
        QuestionPaper paper = questionPaperRepository.findByAssessmentId(assessmentId);
        if (paper == null)
            throw new ResourceNotFoundException("Question paper not found for assessment id: " + assessmentId);
        questionPaperRepository.delete(paper);
    }
}
