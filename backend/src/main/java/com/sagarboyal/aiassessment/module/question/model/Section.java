package com.sagarboyal.aiassessment.module.question.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    private String title;
    private String questionType;
    private String instruction;
    private List<Question> questions;
}