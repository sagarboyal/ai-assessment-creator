package com.sagarboyal.aiassessment.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheFallbackConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(CacheFallbackConfig.class);

    @Bean
    public CacheErrorHandler cacheErrorHandler() {
        return new CacheErrorHandler() {
            @Override
            public void handleCacheGetError(RuntimeException exception, Cache cache, Object key) {
                log("get", cache, key, exception);
            }

            @Override
            public void handleCachePutError(RuntimeException exception, Cache cache, Object key, Object value) {
                log("put", cache, key, exception);
            }

            @Override
            public void handleCacheEvictError(RuntimeException exception, Cache cache, Object key) {
                log("evict", cache, key, exception);
            }

            @Override
            public void handleCacheClearError(RuntimeException exception, Cache cache) {
                LOGGER.warn("Cache clear failed for cache '{}'. Falling back without cache.", cache.getName(), exception);
            }

            private void log(String operation, Cache cache, Object key, RuntimeException exception) {
                LOGGER.warn(
                        "Cache {} failed for cache '{}' and key '{}'. Falling back without cache.",
                        operation,
                        cache.getName(),
                        key,
                        exception
                );
            }
        };
    }
}
