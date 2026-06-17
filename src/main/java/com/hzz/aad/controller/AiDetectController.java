package com.hzz.aad.controller;

import com.hzz.aad.common.Result;
import com.hzz.aad.dto.DetectRequest;
import com.hzz.aad.dto.RewriteRequest;
import com.hzz.aad.service.AiDetectService;
import com.hzz.aad.vo.DetectResponse;
import com.hzz.aad.vo.LanguageOption;
import com.hzz.aad.vo.RewriteResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AiDetectController {

    private final AiDetectService aiDetectService;

    public AiDetectController(AiDetectService aiDetectService) {
        this.aiDetectService = aiDetectService;
    }

    @PostMapping("/detect")
    public Result<DetectResponse> detect(@Valid @RequestBody DetectRequest request) {
        return Result.success(aiDetectService.detect(request));
    }

    @PostMapping("/rewrite")
    public Result<RewriteResponse> rewrite(@Valid @RequestBody RewriteRequest request) {
        return Result.success(aiDetectService.rewrite(request));
    }

    @GetMapping("/languages")
    public Result<List<LanguageOption>> getLanguages() {
        return Result.success(aiDetectService.getLanguages());
    }
}
