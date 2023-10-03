package com.ssafy.a101.api.request;

import com.ssafy.a101.db.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AddUserRequest {
    private String userId;
    private String password;
    private String nickname;
    private String number;

    public User toEntity() {
        return User.builder()
                .userId(getUserId())
                .password(getPassword())
                .nickname(getNickname())
                .number(getNumber())
                .build();
    }
}