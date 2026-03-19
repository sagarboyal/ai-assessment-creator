package com.sagarboyal.aiassessment.module.serviceImpl;

import com.sagarboyal.aiassessment.common.exception.custom.ResourceNotFoundException;
import com.sagarboyal.aiassessment.config.GroqClient;
import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import com.sagarboyal.aiassessment.module.assessment.model.AssessmentStatus;
import com.sagarboyal.aiassessment.module.assessment.repository.AssessmentRepository;
import com.sagarboyal.aiassessment.module.question.model.QuestionPaper;
import com.sagarboyal.aiassessment.module.question.payload.QuestionPaperResponse;
import com.sagarboyal.aiassessment.module.question.repository.QuestionPaperRepository;
import com.sagarboyal.aiassessment.module.question.service.PromptBuilder;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperMapper;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperParser;
import com.sagarboyal.aiassessment.module.question.service.QuestionPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionPaperServiceImpl implements QuestionPaperService {
    private final QuestionPaperRepository questionPaperRepository;
    private final AssessmentRepository assessmentRepository;
    private final QuestionPaperMapper mapper;
    private final PromptBuilder promptBuilder;
    private final GroqClient groqClient;
    private final QuestionPaperParser parser;

    @Override
    public QuestionPaperResponse createQuestionPaper(String assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Assessment not found with id: " + assessmentId));

        assessment.setStatus(AssessmentStatus.PROCESSING);
        assessmentRepository.save(assessment);

        try {
            String prompt = promptBuilder.buildQuestionPaperPrompt(assessment);
            String rawResponse = groqClient.generate(prompt);

            QuestionPaper paper = parser.parse(rawResponse, assessmentId);
            QuestionPaper saved = questionPaperRepository.save(paper);

            assessment.setStatus(AssessmentStatus.COMPLETED);
            assessmentRepository.save(assessment);

            return mapper.toResponse(saved);

        } catch (Exception e) {
            assessment.setStatus(AssessmentStatus.FAILED);
            assessmentRepository.save(assessment);
            throw new RuntimeException("Question paper generation failed: " + e.getMessage());
        }
    }

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
