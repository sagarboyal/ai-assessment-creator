package com.sagarboyal.aiassessment.common.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroqRequest {

    @JsonProperty("model")
    private String model;

    @JsonProperty("messages")
    private List<GroqMessage> messages;

    @JsonProperty("temperature")
    private Double temperature;

    @JsonProperty("max_tokens")
    private Integer maxTokens;

    @JsonProperty("response_format")
    private ResponseFormat responseFormat;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseFormat {
        @JsonProperty("type")
        private String type;
    }
}