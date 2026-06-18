package com.hzz.aad.service;

import com.hzz.aad.dto.DetectRequest;
import com.hzz.aad.dto.RewriteRequest;
import com.hzz.aad.vo.DetectResponse;
import com.hzz.aad.vo.LanguageOption;
import com.hzz.aad.vo.RewriteResponse;

import java.util.List;

public interface IAiDetectService {
    DetectResponse detect(DetectRequest request);
    RewriteResponse rewrite(RewriteRequest request);
    List<LanguageOption> getLanguages();
}
