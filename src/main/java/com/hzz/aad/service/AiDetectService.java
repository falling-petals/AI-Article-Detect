package com.hzz.aad.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hzz.aad.constant.AppConstants;
import com.hzz.aad.dto.DetectRequest;
import com.hzz.aad.dto.RewriteRequest;
import com.hzz.aad.vo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiDetectService {

    private static final Logger log = LoggerFactory.getLogger(AiDetectService.class);

    private final ChatClient chatClient;
    private final PromptService promptService;
    private final ObjectMapper objectMapper;

    public AiDetectService(ChatClient.Builder chatClientBuilder,
                           PromptService promptService,
                           ObjectMapper objectMapper) {
        this.chatClient = chatClientBuilder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .build();
        this.promptService = promptService;
        this.objectMapper = objectMapper;
    }

    public DetectResponse detect(DetectRequest request) {
        String prompt = promptService.buildDetectPrompt(request.getText(), request.getLanguage());
        String response = callAi(prompt);
        return parseDetectResponse(response);
    }

    public RewriteResponse rewrite(RewriteRequest request) {
        String prompt = promptService.buildRewritePrompt(
                request.getText(), request.getLanguage(),
                request.getStyle(), request.getTargetAiRate());
        String response = callAi(prompt);
        return parseRewriteResponse(response);
    }

    public List<LanguageOption> getLanguages() {
        return List.of(
                new LanguageOption(AppConstants.LANG_ZH, AppConstants.LANG_ZH_LABEL),
                new LanguageOption("en", AppConstants.LANG_EN_LABEL)
        );
    }

    private String callAi(String prompt) {
        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    private DetectResponse parseDetectResponse(String json) {
        try {
            return objectMapper.readValue(extractJson(json), DetectResponse.class);
        } catch (JsonProcessingException e) {
            log.error("解析检测响应失败: {}", json, e);
            DetectResponse fallback = new DetectResponse();
            fallback.setAiRate(AppConstants.FALLBACK_AI_RATE);
            fallback.setSummary(AppConstants.FALLBACK_DETECT_SUMMARY);
            return fallback;
        }
    }

    private RewriteResponse parseRewriteResponse(String json) {
        try {
            return objectMapper.readValue(extractJson(json), RewriteResponse.class);
        } catch (JsonProcessingException e) {
            log.error("解析改写响应失败: {}", json, e);
            RewriteResponse fallback = new RewriteResponse();
            fallback.setRewrittenText(AppConstants.FALLBACK_REWRITTEN_TEXT);
            fallback.setOriginalAiRate(AppConstants.FALLBACK_RATE_ZERO);
            fallback.setRewrittenAiRate(AppConstants.FALLBACK_RATE_ZERO);
            return fallback;
        }
    }

    private String extractJson(String text) {
        int start = text.indexOf(AppConstants.JSON_START);
        int end = text.lastIndexOf(AppConstants.JSON_END);
        if (start != -1 && end > start) {
            return text.substring(start, end + 1);
        }
        return text;
    }
}
