package com.sagarboyal.aiassessment.config;


import com.sagarboyal.aiassessment.common.payload.GroqMessage;
import com.sagarboyal.aiassessment.common.payload.GroqRequest;
import com.sagarboyal.aiassessment.common.payload.GroqResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class GroqClient {

    private final WebClient groqWebClient;

    @Value("${ai.groq.model}")
    private String model;

    public String generate(String prompt) {
        GroqRequest request = GroqRequest.builder()
                .model(model)
                .temperature(0.7)
                .maxTokens(4096)
                .responseFormat(new GroqRequest.ResponseFormat("json_object"))
                .messages(List.of(
                        GroqMessage.builder()
                                .role("system")
                                .content("You are an expert question paper generator. Always respond with valid JSON only.")
                                .build(),
                        GroqMessage.builder()
                                .role("user")
                                .content(prompt)
                                .build()
                ))
                .build();

        log.info("Calling Groq API with model: {}", model);

        GroqResponse response = groqWebClient
                .post()
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GroqResponse.class)
                .block();

        if (response == null || response.getContent() == null) {
            throw new RuntimeException("Empty response from Groq API");
        }

        log.info("Groq API response received successfully");
        return response.getContent();
    }
}