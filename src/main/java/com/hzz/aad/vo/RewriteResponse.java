package com.hzz.aad.vo;

import java.util.List;

public class RewriteResponse {
    private double originalAiRate;
    private String rewrittenText;
    private double rewrittenAiRate;
    private String rewriteStyle;
    private List<Change> changes;

    public double getOriginalAiRate() { return originalAiRate; }
    public void setOriginalAiRate(double originalAiRate) { this.originalAiRate = originalAiRate; }
    public String getRewrittenText() { return rewrittenText; }
    public void setRewrittenText(String rewrittenText) { this.rewrittenText = rewrittenText; }
    public double getRewrittenAiRate() { return rewrittenAiRate; }
    public void setRewrittenAiRate(double rewrittenAiRate) { this.rewrittenAiRate = rewrittenAiRate; }
    public String getRewriteStyle() { return rewriteStyle; }
    public void setRewriteStyle(String rewriteStyle) { this.rewriteStyle = rewriteStyle; }
    public List<Change> getChanges() { return changes; }
    public void setChanges(List<Change> changes) { this.changes = changes; }
}
