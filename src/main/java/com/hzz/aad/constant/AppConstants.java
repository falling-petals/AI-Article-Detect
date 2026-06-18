package com.hzz.aad.constant;

import java.util.Map;

public class AppConstants {

    public static final String LANG_ZH = "zh";
    public static final String LANG_ZH_LABEL = "中文";
    public static final String LANG_EN_LABEL = "English";

    public static final int FALLBACK_AI_RATE = 50;
    public static final String FALLBACK_DETECT_SUMMARY = "解析 AI 响应失败，请重试";
    public static final double FALLBACK_RATE_ZERO = 0;
    public static final String FALLBACK_REWRITTEN_TEXT = "";

    public static final int CODE_SUCCESS = 200;
    public static final int CODE_BAD_REQUEST = 400;
    public static final int CODE_INTERNAL_ERROR = 500;

    public static final String MSG_SUCCESS = "成功";
    public static final String MSG_INTERNAL_ERROR = "服务器内部错误，请稍后重试";

    public static final String STYLE_CONVERSATIONAL = "conversational";
    public static final String STYLE_ACADEMIC = "academic";
    public static final String STYLE_JOURNALISTIC = "journalistic";
    public static final String STYLE_HUMOROUS = "humorous";

    public static final Map<String, String> STYLE_DESCRIPTIONS = Map.of(
            STYLE_CONVERSATIONAL, "口语化、像日常对话",
            STYLE_ACADEMIC, "学术写作风格",
            STYLE_JOURNALISTIC, "新闻报道风格",
            STYLE_HUMOROUS, "幽默搞笑风格"
    );

    public static final Map<String, String> STYLE_DESCRIPTIONS_EN = Map.of(
            STYLE_CONVERSATIONAL, "casual and conversational",
            STYLE_ACADEMIC, "academic writing style",
            STYLE_JOURNALISTIC, "journalistic style",
            STYLE_HUMOROUS, "humorous and witty"
    );

    public static final String JSON_START = "{";
    public static final String JSON_END = "}";

    private AppConstants() {}
}
