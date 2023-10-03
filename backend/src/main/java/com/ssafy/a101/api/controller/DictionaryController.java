package com.ssafy.a101.api.controller;


import com.ssafy.a101.api.response.DictionaryResponse;
import com.ssafy.a101.api.service.DictionaryService;
import com.ssafy.a101.db.entity.Dictionary;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class DictionaryController {
    private final DictionaryService dictionaryService;

    // 전체값 확인
    @GetMapping("/api/dicts")
    public ResponseEntity<List<DictionaryResponse>> findAllDictionary(){
        List<DictionaryResponse> dictionarys = dictionaryService.findAll()
                .stream()
                .map(DictionaryResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .body(dictionarys);
    }

    // 특정 값 조회
    @GetMapping("/api/dict/{id}")
    public ResponseEntity<DictionaryResponse> findDictionary(@PathVariable long id){
        Dictionary dictionary = dictionaryService.findById(id);
        return ResponseEntity.ok()
                .body(new DictionaryResponse(dictionary));
    }
}
