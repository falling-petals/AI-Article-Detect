package com.hzz.aad.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RewriteRequest {
    @NotBlank(message = "文本不能为空")
    @Size(max = 10000, message = "文本长度不能超过10000字")
    private String text;

    @NotBlank(message = "语言不能为空")
    private String language;

    private String style = "conversational";

    @Min(value = 5, message = "目标AI率不能低于5")
    @Max(value = 60, message = "目标AI率不能超过60")
    private int targetAiRate = 30;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public int getTargetAiRate() { return targetAiRate; }
    public void setTargetAiRate(int targetAiRate) { this.targetAiRate = targetAiRate; }
}
