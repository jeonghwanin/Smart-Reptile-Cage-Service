package com.ssafy.a101.api.controller;


import com.ssafy.a101.api.response.StoreResponse;
import com.ssafy.a101.api.service.StoreService;
import com.ssafy.a101.db.entity.Store;
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
public class StoreController {
    private final StoreService storeService;
    
    // 스토어 전체보기
    @GetMapping("/api/store")
    public ResponseEntity<List<StoreResponse>> findAllStore(){
        System.out.println("asdf");
        List<StoreResponse> stores = storeService.findAll()
                .stream()
                .map(StoreResponse::new)
                .collect(Collectors.toList());
        System.out.println("asdf");
        System.out.println(stores);
        return ResponseEntity.ok()
                .body(stores);
    }

    // 스토어 골라보기
    @GetMapping("/api/store/{store_id}")
    public ResponseEntity<StoreResponse> findStore(@PathVariable long store_id){
        Store store = storeService.findById(store_id);
        return ResponseEntity.ok()
                .build();
    }
}
