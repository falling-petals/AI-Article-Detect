package com.hzz.aad.vo;

import java.util.List;

public class DetectResponse {
    private double aiRate;
    private List<Segment> segments;
    private String summary;

    public double getAiRate() { return aiRate; }
    public void setAiRate(double aiRate) { this.aiRate = aiRate; }
    public List<Segment> getSegments() { return segments; }
    public void setSegments(List<Segment> segments) { this.segments = segments; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
