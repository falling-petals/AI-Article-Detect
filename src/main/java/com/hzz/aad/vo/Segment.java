package com.hzz.aad.vo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Segment {
    private String text;
    private boolean isAi;
    private double confidence;
    private String reason;

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    @JsonProperty("isAi")
    public boolean isAi() { return isAi; }
    @JsonProperty("isAi")
    public void setAi(boolean ai) { isAi = ai; }
    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
