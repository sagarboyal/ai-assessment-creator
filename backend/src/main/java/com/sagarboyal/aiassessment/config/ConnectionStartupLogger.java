package com.sagarboyal.aiassessment.config;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class ConnectionStartupLogger {

    private static final Logger LOGGER = LoggerFactory.getLogger(ConnectionStartupLogger.class);

    @Bean
    public ApplicationRunner connectionVerifier(MongoTemplate mongoTemplate, RedisConnectionFactory redisConnectionFactory) {
        return args -> {
            try {
                mongoTemplate.getDb().runCommand(new Document("ping", 1));
                LOGGER.info("MongoDB connected successfully. Database: {}", mongoTemplate.getDb().getName());
            } catch (Exception exception) {
                LOGGER.warn("MongoDB connection check failed during startup.", exception);
            }

            try (RedisConnection connection = redisConnectionFactory.getConnection()) {
                String pong = connection.ping();
                LOGGER.info("Redis connected successfully. Ping response: {}", pong);
            } catch (Exception exception) {
                LOGGER.warn("Redis connection check failed during startup.", exception);
            }
        };
    }
}
