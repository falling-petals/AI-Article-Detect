package com.hzz.aad.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DetectRequest {
    @NotBlank(message = "文本不能为空")
    @Size(max = 10000, message = "文本长度不能超过10000字")
    private String text;

    @NotBlank(message = "语言不能为空")
    private String language;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
}
