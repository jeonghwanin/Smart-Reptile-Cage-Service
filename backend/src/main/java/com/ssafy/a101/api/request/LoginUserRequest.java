package com.ssafy.a101.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginUserRequest {
    private String userId;
    private String password;
    public LoginUserRequest() {}
}
