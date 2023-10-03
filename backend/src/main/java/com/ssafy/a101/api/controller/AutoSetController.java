package com.ssafy.a101.api.controller;


import com.ssafy.a101.api.request.AddAutoSetRequest;
import com.ssafy.a101.api.request.UpdateAutoSetRequest;
import com.ssafy.a101.api.response.AutoSetResponse;
import com.ssafy.a101.api.response.CageResponse;
import com.ssafy.a101.api.service.AutoSetService;
import com.ssafy.a101.db.entity.AutoSet;
import com.ssafy.a101.db.entity.Cage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class AutoSetController {
    private final AutoSetService autoSetService;

    // 전체 세팅 조회
    @GetMapping("/api/{cage_id}/setting")
    public ResponseEntity<List<AutoSetResponse>> findAllAutoSet(@PathVariable Long cage_id){
        List<AutoSetResponse> autosets = autoSetService.findALL(cage_id)
                .stream()
                .map(AutoSetResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(autosets);
    }

    // 특정 세팅 조회
    @GetMapping("/api/setting/{set_id}")
    public ResponseEntity<AutoSetResponse> findAutoset(@PathVariable long set_id){
        AutoSet autoset = autoSetService.findById(set_id);
        return ResponseEntity.ok()
                .body(new AutoSetResponse(autoset));
        //id에 들어온 값을 조회한다.
    }

    //세팅 추가
    @PostMapping("/api/setting")
    public ResponseEntity<AutoSet> addAutoset(@RequestBody AddAutoSetRequest request){
        AutoSet autoSet = autoSetService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(autoSet);
    }

    //세팅 수정
    @PutMapping("/api/setting/{set_id}")
    public ResponseEntity<AutoSet> updateAutoset(@PathVariable long set_id,
                                                  @RequestBody UpdateAutoSetRequest request) {
        AutoSet updateAutoset = autoSetService.update(set_id, request);
        return ResponseEntity.ok()
                .body(updateAutoset);
    }

    //세팅 삭제
    @DeleteMapping("/api/setting/{set_id}")
    public ResponseEntity<Void> deleteAutoset(@PathVariable long set_id){
        autoSetService.delete(set_id);
        return ResponseEntity.ok()
                .build();
    }
}
