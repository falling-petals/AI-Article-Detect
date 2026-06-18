package com.hzz.aad.util;

import java.util.List;
import java.util.regex.Pattern;

public class MultiModelDetector {

    private static final List<Pattern> MULTIMODAL_PATTERNS = List.of(
            Pattern.compile("^qwen3\\.[567]"),
            Pattern.compile("^qwen3-vl"),
            Pattern.compile("-vl-"),
            Pattern.compile("^qvq"),
            Pattern.compile("-omni-"),
            Pattern.compile("^qwen-omni"),
            Pattern.compile("^qwen2\\.5-omni")
    );

    public static boolean isMultimodal(String modelName) {
        if (modelName == null || modelName.isBlank()) return false;
        String lower = modelName.toLowerCase().trim();
        return MULTIMODAL_PATTERNS.stream().anyMatch(p -> p.matcher(lower).find());
    }
}
