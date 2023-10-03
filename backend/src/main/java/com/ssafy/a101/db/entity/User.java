package com.ssafy.a101.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "user_id", updatable = false)
    private String userId;

    @Column(name = "password", updatable = true)
    private String password;

    @Column(name = "nickname", updatable = true)
    private String nickname;

    @Column(name = "number", updatable = false)
    private String number;

//    @Builder
//    public User(String email, String password, String nickname) {
//        this.email = email;
//        this.password = password;
//        this.nickname = nickname;
//    }

    @Builder
    public User(String userId, String password, String nickname, String number) {
        this.userId = userId;
        this.password = password;
        this.nickname = nickname;
        this.number = number;
    }
    public void update(String password, String nickname){
        this.password = password;
        this.nickname = nickname;
    }
}