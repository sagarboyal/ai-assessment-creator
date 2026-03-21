package com.sagarboyal.aiassessment.common.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroqResponse {

    @JsonProperty("choices")
    private List<Choice> choices;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Choice {
        @JsonProperty("message")
        private GroqMessage message;
    }

    public String getContent() {
        if (choices != null && !choices.isEmpty()) {
            return choices.getFirst().getMessage().getContent();
        }
        return null;
    }
}