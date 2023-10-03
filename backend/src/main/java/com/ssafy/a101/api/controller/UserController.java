package com.ssafy.a101.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.a101.api.request.AddUserRequest;
import com.ssafy.a101.api.request.LoginUserRequest;
import com.ssafy.a101.api.request.UpdateUserRequest;
import com.ssafy.a101.api.response.SmsResponse;
import com.ssafy.a101.api.response.UserResponse;
import com.ssafy.a101.api.service.EmailService;
import com.ssafy.a101.api.service.SmsService;
import com.ssafy.a101.api.service.UserService;
import com.ssafy.a101.db.entity.Message;
import com.ssafy.a101.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Email;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final EmailService emailService;
    private final SmsService smsService;

    // 회원 가입
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody AddUserRequest request){
        userService.join(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(("회원 가입을 성공했습니다."));
    }

    @GetMapping("/join/{userId}")
    public ResponseEntity<Integer> check(@PathVariable String userId) {
        int response = userService.check(userId);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/join/sms")
    public ResponseEntity<String> sendSms(@RequestBody Message message) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        SmsResponse response = smsService.sendSms(message);
        return ResponseEntity.ok().body(response.getSmsConfirmNum());
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserRequest request) {
        return ResponseEntity.ok().body(userService.login(request));
    }

    // 회원 정보 조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> findUser(@PathVariable String userId){
        User user = userService.findByUserId(userId);
        return ResponseEntity.ok()
                .body(new UserResponse(user));
    }

    // 회원 정보 수정
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody UpdateUserRequest request){
        User updateUser = userService.update(id, request);
        return ResponseEntity.ok().body(updateUser);
    }

    // 회원 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){
        userService.delete(id);
        return ResponseEntity.ok().build();
    }
}