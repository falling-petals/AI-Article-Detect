package com.hzz.aad.exception;

import com.hzz.aad.common.Result;
import com.hzz.aad.constant.AppConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Result<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (a, b) -> a
                ));
        return Result.<Map<String, String>>error(AppConstants.CODE_BAD_REQUEST, "参数校验失败")
                .setData(errors);
    }

    @ExceptionHandler(Exception.class)
    public Result<Void> handleGeneral(Exception ex) {
        log.error("服务器内部错误", ex);
        return Result.error(AppConstants.CODE_INTERNAL_ERROR, AppConstants.MSG_INTERNAL_ERROR);
    }
}
