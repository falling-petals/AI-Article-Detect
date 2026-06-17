package com.hzz.aad.common;

import com.hzz.aad.constant.AppConstants;

public class Result<T> {
    private int code;
    private String message;
    private T data;

    public Result() {}

    public static <T> Result<T> success(T data) {
        Result<T> r = new Result<>();
        r.code = AppConstants.CODE_SUCCESS;
        r.message = AppConstants.MSG_SUCCESS;
        r.data = data;
        return r;
    }

    public static <T> Result<T> success(T data, String message) {
        Result<T> r = new Result<>();
        r.code = AppConstants.CODE_SUCCESS;
        r.message = message;
        r.data = data;
        return r;
    }

    public static <T> Result<T> error(int code, String message) {
        Result<T> r = new Result<>();
        r.code = code;
        r.message = message;
        return r;
    }

    public int getCode() { return code; }
    public void setCode(int code) { this.code = code; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public T getData() { return data; }
    public Result<T> setData(T data) { this.data = data; return this; }
}
