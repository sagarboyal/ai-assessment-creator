package com.sagarboyal.aiassessment.common.utils;

import org.springframework.stereotype.Component;

import java.util.Collection;
@Component
public class AppUtils {
    public <T> T merge(T oldValue, T newValue) {
        return switch (newValue) {
            case null -> oldValue;
            case String s when s.isBlank() -> oldValue;
            case Collection<?> objects when objects.isEmpty() -> oldValue;
            default -> newValue.equals(oldValue) ? oldValue : newValue;
        };
    }
}
