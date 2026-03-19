package com.sagarboyal.aiassessment.common.utils;

import org.springframework.stereotype.Component;

@Component
public class StringUtils {

    public String clean(String text) {
        if (text == null || text.isBlank()) return "";
        return text.trim().replaceAll("\\s+", " ");
    }

    public boolean isBlank(String text) {
        return text == null || text.isBlank();
    }
}