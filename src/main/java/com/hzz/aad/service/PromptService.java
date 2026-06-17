package com.hzz.aad.service;

import com.hzz.aad.constant.AppConstants;
import org.springframework.stereotype.Service;

@Service
public class PromptService {

    public String buildDetectPrompt(String text, String language) {
        String lang = labelOf(language);
        return """
            你是一位专业的 AI 文本检测专家。请分析以下 %s 文本，判断它是人类写作还是 AI 生成。

            请严格按照以下 JSON 格式返回，不要包含任何其他内容：
            {
              "aiRate": 0-100 的整数，表示 AI 生成的概率，
              "segments": [
                {
                  "text": "片段原文",
                  "isAi": true 或 false,
                  "confidence": 0-100 的整数，
                  "reason": "判断理由（一句话，%s）"
                }
              ],
              "summary": "整体判断摘要（一句话，%s）"
            }

            文本内容：
            ---
            %s
            ---
            """.formatted(lang, lang, lang, text);
    }

    public String buildRewritePrompt(String text, String language, String style, int targetAiRate) {
        String lang = labelOf(language);
        String styleDesc = AppConstants.STYLE_DESCRIPTIONS
                .getOrDefault(style, "自然流畅的人类写作风格");

        return """
            你是一位文本改写专家。请将以下 %s 文本改写成%s，使其 AI 生成特征降低到 %d%% 以下，
            同时保留原意和关键信息。

            请严格按照以下 JSON 格式返回，不要包含任何其他内容：
            {
              "originalAiRate": 0-100 的整数，原文的 AI 生成概率，
              "rewrittenText": "改写后的完整文本",
              "rewrittenAiRate": 0-100 的整数，改写后的 AI 生成概率，
              "rewriteStyle": "%s",
              "changes": [
                {
                  "original": "原文中被修改的片段",
                  "rewritten": "改写后的片段",
                  "reason": "为什么这样改（%s）"
                }
              ]
            }

            文本内容：
            ---
            %s
            ---
            """.formatted(lang, styleDesc, targetAiRate, style, lang, text);
    }

    private String labelOf(String language) {
        return AppConstants.LANG_ZH.equals(language)
                ? AppConstants.LANG_ZH_LABEL
                : AppConstants.LANG_EN_LABEL;
    }
}
