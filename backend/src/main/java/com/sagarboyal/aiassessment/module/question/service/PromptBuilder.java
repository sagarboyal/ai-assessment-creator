package com.sagarboyal.aiassessment.module.question.service;

import com.sagarboyal.aiassessment.module.assessment.model.Assessment;
import com.sagarboyal.aiassessment.module.assessment.model.QuestionTypeConfig;
import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {
    public String buildQuestionPaperPrompt(Assessment assessment) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are an expert teacher and question paper setter.\n\n");
        prompt.append("Generate a complete question paper with the following details:\n");
        prompt.append("School: ").append(assessment.getSchoolName()).append("\n");
        prompt.append("Subject: ").append(assessment.getSubject()).append("\n");
        prompt.append("Class: ").append(assessment.getClassName()).append("\n");
        prompt.append("Time Allowed: ").append(assessment.getTimeAllowed()).append(" minutes\n");

        if (assessment.getAdditionalInstructions() != null
                && !assessment.getAdditionalInstructions().isBlank()) {
            prompt.append("Additional Instructions: ")
                    .append(assessment.getAdditionalInstructions()).append("\n");
        }

        prompt.append("\nQuestion Paper Structure:\n");

        char sectionLabel = 'A';
        int totalMarks = 0;

        for (QuestionTypeConfig config : assessment.getQuestionTypes()) {
            int sectionTotal = config.getNumberOfQuestions() * config.getMarksPerQuestion();
            totalMarks += sectionTotal;
            prompt.append("Section ").append(sectionLabel).append(": ")
                    .append(config.getType()).append("\n");
            prompt.append("  - Number of questions: ")
                    .append(config.getNumberOfQuestions()).append("\n");
            prompt.append("  - Marks per question: ")
                    .append(config.getMarksPerQuestion()).append("\n");
            prompt.append("  - Section total: ").append(sectionTotal).append(" marks\n");
            sectionLabel++;
        }

        prompt.append("\nTotal Marks: ").append(totalMarks).append("\n");

        if (assessment.getAdditionalInstructions() != null
                && !assessment.getAdditionalInstructions().isBlank()) {
            prompt.append("\nTeacher's Additional Instructions for Question Generation:\n");
            prompt.append(assessment.getAdditionalInstructions()).append("\n");
            prompt.append("Please incorporate the above instructions while generating the questions.\n");
        }

        prompt.append("""

            IMPORTANT RULES:
            1. Assign difficulty levels: EASY, MODERATE, or CHALLENGING to each question.
            2. Mix difficulty levels naturally within each section.
            3. For MCQ type questions provide exactly 4 options, for all other types options must be null.
            4. For all questions provide the correct answer in the answer key.
            5. Questions must match the subject and class level appropriately.
            6. The "questionType" field in each section must exactly match the type given in the structure above.
            7. The "type" field inside each question must also exactly match its section question type.
            8. Each section instruction must say: "Attempt all questions. Each question carries X marks" where X is the marks per question.
            9. Do NOT include any explanation or extra text outside the JSON.
            10. Return ONLY a valid JSON object in exactly this format:

            {
              "schoolName": "string",
              "subject": "string",
              "className": "string",
              "timeAllowed": number,
              "totalMarks": number,
              "generalInstruction": "All questions are compulsory unless stated otherwise.",
              "sections": [
                {
                  "title": "Section A",
                  "questionType": "<exact type from input>",
                  "instruction": "Attempt all questions. Each question carries X marks",
                  "questions": [
                    {
                      "questionNumber": number,
                      "questionText": "[Easy] question text here",
                      "options": ["option1", "option2", "option3", "option4"] or null,
                      "answer": "string",
                      "difficulty": "EASY" | "MODERATE" | "CHALLENGING",
                      "marks": number,
                      "type": "<exact type from input>"
                    }
                  ]
                }
              ],
              "answerKey": [
                {
                  "questionNumber": number,
                  "questionText": "question text without difficulty tag",
                  "options": ["option1", "option2", "option3", "option4"] or null,
                  "answer": "string",
                  "difficulty": "EASY" | "MODERATE" | "CHALLENGING",
                  "marks": number,
                  "type": "<exact type from input>"
                }
              ]
            }
            """);

        return prompt.toString();
    }
}
