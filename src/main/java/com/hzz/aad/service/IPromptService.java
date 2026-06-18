package com.hzz.aad.service;

public interface IPromptService {
    String buildDetectPrompt(String text, String language);
    String buildRewritePrompt(String text, String language, String style, int targetAiRate);
}
