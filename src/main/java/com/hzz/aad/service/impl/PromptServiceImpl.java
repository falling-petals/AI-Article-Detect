package com.hzz.aad.service.impl;

import com.hzz.aad.constant.AppConstants;
import com.hzz.aad.constant.PromptConstants;
import com.hzz.aad.service.IPromptService;
import org.springframework.stereotype.Service;

@Service
public class PromptServiceImpl implements IPromptService {

    @Override
    public String buildDetectPrompt(String text, String language) {
        String lang = labelOf(language);
        return PromptConstants.DETECT_PROMPT_TEMPLATE.formatted(lang, lang, lang, text);
    }

    @Override
    public String buildRewritePrompt(String text, String language, String style, int targetAiRate) {
        boolean isZh = AppConstants.LANG_ZH.equals(language);
        String lang = isZh ? AppConstants.LANG_ZH_LABEL : AppConstants.LANG_EN_LABEL;
        String styleDesc = isZh
                ? AppConstants.STYLE_DESCRIPTIONS.getOrDefault(style, "自然流畅的人类写作风格")
                : AppConstants.STYLE_DESCRIPTIONS_EN.getOrDefault(style, "natural human writing style");
        return PromptConstants.REWRITE_PROMPT_TEMPLATE.formatted(lang, styleDesc, targetAiRate, PromptConstants.HUMANIZER_GUIDELINES, style, lang, text);
    }

    private String labelOf(String language) {
        return AppConstants.LANG_ZH.equals(language)
                ? AppConstants.LANG_ZH_LABEL
                : AppConstants.LANG_EN_LABEL;
    }
}
