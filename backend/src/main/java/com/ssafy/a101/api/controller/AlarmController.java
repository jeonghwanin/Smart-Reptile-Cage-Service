package com.ssafy.a101.api.controller;


import com.ssafy.a101.api.request.AddAlarmRequest;
import com.ssafy.a101.api.request.UpdateAlarmRequest;
import com.ssafy.a101.api.response.AlarmResponse;
import com.ssafy.a101.api.service.AlarmService;
import com.ssafy.a101.api.service.CageService;
import com.ssafy.a101.db.entity.Alarm;
import com.ssafy.a101.db.entity.Cage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("/api/alarm")
public class AlarmController {
    private final AlarmService alarmService;
    private final CageService cageService;

    // 전체 알람 조회
    @GetMapping("/cage/{cage_id}")
    public ResponseEntity<List<AlarmResponse>> findAllAlarm(@PathVariable long cage_id){
        List<AlarmResponse> alarms =  alarmService.findAll(cage_id)
                .stream()
                .map(AlarmResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(alarms);
    }

    // 특정 알람 조회
    @GetMapping("/{arm_id}")
    public ResponseEntity<AlarmResponse> findAlarm(@PathVariable long arm_id){
        Alarm alarm = alarmService.findByid(arm_id);
        return ResponseEntity.ok()
                .body(new AlarmResponse(alarm));
    }

    // 유저별 모든 알람 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AlarmResponse>> findAllAlarmByUser(@PathVariable long userId) {
        List<Cage> cages = cageService.findAll(userId);
        List<AlarmResponse> alarms = new ArrayList<>();
        cages.forEach(cage -> {
            Long cageId = cage.getCageId();
            List<AlarmResponse> temp = alarmService.findAll(cageId)
                    .stream()
                    .map(AlarmResponse::new)
                    .collect(Collectors.toList());
            alarms.addAll(temp);
        });
        return ResponseEntity.ok().
                body(alarms);
    }

    // 알람 추가
    @PostMapping("")
    public ResponseEntity<Alarm> addAlarm(@RequestBody AddAlarmRequest request){
        Alarm savedAlarm = alarmService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedAlarm);
    }

    // 알람 수정
    @PutMapping("/{arm_id}")
    public ResponseEntity<Alarm> updateAlarm(@PathVariable Long arm_id,
                                             @RequestBody UpdateAlarmRequest request){
        Alarm updatedAlarm = alarmService.update(arm_id, request);
        return ResponseEntity.ok()
                .body(updatedAlarm);
    }

    // 알람 삭제
    @DeleteMapping("/{arm_id}")
    public ResponseEntity<Void> deleteAlarm(@PathVariable long arm_id){
        alarmService.delete(arm_id);
        return ResponseEntity.ok()
                .build();
    }
}