package com.ssafy.a101.api.service;

import com.ssafy.a101.api.request.AddUserRequest;
import com.ssafy.a101.api.request.LoginUserRequest;
import com.ssafy.a101.api.request.UpdateUserRequest;
import com.ssafy.a101.db.entity.User;
import com.ssafy.a101.db.repository.UserRepository;
import com.ssafy.a101.util.TokenUtil;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.implementation.bind.MethodDelegationBinder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Value("${jwt.token.secret}")
    private String key;

    public void join (AddUserRequest dto) {
        // 중복 check
        userRepository.findByUserId(dto.getUserId())
                .ifPresent(user -> {
//                    throw new AppException(ErrorCode.USERNAME_DUPLICATED, dto.getUserId() + "는(은) 이미 존재하는 아이디입니다.");
                    throw new RuntimeException("이미 존재하는 아이디입니다.");
                });
        // 회원 가입
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        userRepository.save(User.builder()
                .userId(dto.getUserId())
                .password(encoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .number(dto.getNumber())
                .build()).getId();
    }

    public int check(String userId) {
        int[] res = new int[1];
        userRepository.findByUserId(userId)
                .ifPresent(user -> res[0] = 1);
        return res[0];
    }

    public String login (LoginUserRequest dto) {
        // userId 없을 경우
        User selectedUser = userRepository.findByUserId(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("해당 아이디가 존재하지 않습니다."));
        // 비밀번호가 틀렸을 경우
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(dto.getPassword(), selectedUser.getPassword())) {
            throw new RuntimeException("비밀번호를 잘못 입력하셨습니다.");
        }

        String token = TokenUtil.createToken(selectedUser.getUserId(), key, 1000 * 60 * 60l);

        // 토큰 발행
        return token;
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("해당 아이디가 존재하지 않습니다."));
    }

    @Transactional
    public User update(Long id, UpdateUserRequest dto) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException());
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.update(encoder.encode(dto.getPassword()), dto.getNickname());
        return user;
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
    // 이메일을 입력 받아 users 테이블에서 유저를 찾고, 없으면 예외를 발생
//    public User findByEmail(String email) {
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
//    }
}