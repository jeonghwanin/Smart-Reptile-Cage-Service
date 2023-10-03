package com.ssafy.a101.api.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateUserRequest {
    //private Long id;
    private String userId;
    private String password;
    private String nickname;
    private String email;
}
