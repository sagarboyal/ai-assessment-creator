package com.sagarboyal.aiassessment.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJacksonJsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisCacheConfig {

    public static final String ASSESSMENT_CACHE = "assessmentById";
    public static final String QUESTION_PAPER_BY_ID_CACHE = "questionPaperById";
    public static final String QUESTION_PAPER_BY_ASSESSMENT_CACHE = "questionPaperByAssessmentId";

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        GenericJacksonJsonRedisSerializer serializer = GenericJacksonJsonRedisSerializer.builder()
                .enableUnsafeDefaultTyping()
                .build();

        RedisCacheConfiguration defaultConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(10))
                .disableCachingNullValues()
                .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer));

        Map<String, RedisCacheConfiguration> cacheConfigurations = new HashMap<>();
        cacheConfigurations.put(ASSESSMENT_CACHE, defaultConfiguration.entryTtl(Duration.ofMinutes(10)));
        cacheConfigurations.put(QUESTION_PAPER_BY_ID_CACHE, defaultConfiguration.entryTtl(Duration.ofMinutes(15)));
        cacheConfigurations.put(QUESTION_PAPER_BY_ASSESSMENT_CACHE, defaultConfiguration.entryTtl(Duration.ofMinutes(15)));

        return RedisCacheManager.builder(redisConnectionFactory)
                .cacheDefaults(defaultConfiguration)
                .withInitialCacheConfigurations(cacheConfigurations)
                .build();
    }
}
