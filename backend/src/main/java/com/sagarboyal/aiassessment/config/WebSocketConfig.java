package com.sagarboyal.aiassessment.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Value("${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Value("${app.websocket.endpoint}")
    private String endpoint;

    @Value("${app.websocket.broker-prefixes}")
    private List<String> brokerPrefixes;

    @Value("${app.websocket.application-destination-prefixes}")
    private List<String> applicationDestinationPrefixes;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker(brokerPrefixes.toArray(String[]::new));
        registry.setApplicationDestinationPrefixes(applicationDestinationPrefixes.toArray(String[]::new));
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint(endpoint)
                .setAllowedOrigins(allowedOrigins.toArray(String[]::new));
    }
}
