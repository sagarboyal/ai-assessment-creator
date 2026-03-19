package com.sagarboyal.aiassessment.common.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroqMessage {

    @JsonProperty("role")
    private String role;

    @JsonProperty("content")
    private String content;
}