package com.ssafy.a101.api.controller;

import com.ssafy.a101.api.request.AddCageRequest;
import com.ssafy.a101.api.request.UpdateCageRequest;
import com.ssafy.a101.api.response.CageResponse;
import com.ssafy.a101.api.service.CageService;
import com.ssafy.a101.db.entity.Cage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class CageController {
    @Autowired
    private final CageService cageService;

    // 사용자의 모든 케이지 조회
    @GetMapping("/api/{id}/cages")
    public ResponseEntity<List<CageResponse>> findAllCages(@PathVariable Long id){
        List<CageResponse> cages = cageService.findAll(id)
                .stream()
                .map(CageResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(cages);
    }

    // 특정 케이지 조회
    @GetMapping("/api/cage/{cage_id}")
    public ResponseEntity<CageResponse> findCage(@PathVariable long cage_id){
        Cage cage = cageService.findById(cage_id);
        return ResponseEntity.ok()
                .body(new CageResponse(cage));
    }

    // 케이지 추가
    @PostMapping("/api/cage")
    public ResponseEntity<Cage> addCage(@RequestBody AddCageRequest request){
        Cage savedCage  = cageService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedCage);
    }

    // 케이지 수정
    @PutMapping("/api/cage/{cage_id}")
    public ResponseEntity<Cage> updateCage(@PathVariable long cage_id,
                                           @RequestBody UpdateCageRequest request){
        Cage updateCage = cageService.update(cage_id, request);
        return ResponseEntity.ok()
                .body(updateCage);
    }

    // 케이지 삭제
    @DeleteMapping("/api/cage/{cage_id}")
    public ResponseEntity<Cage>  deleteCage(@PathVariable long cage_id){
        cageService.delete(cage_id);
        return ResponseEntity.ok()
                .build();

    }
}
