package com.ssafy.a101.api.service;

import com.ssafy.a101.db.entity.Store;
import com.ssafy.a101.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@RequiredArgsConstructor
@Service // 빈으로 등록
public class StoreService {

    private final StoreRepository storeRepository;

    //글 전체 조회
    public List<Store> findAll(){ return storeRepository.findAll();}

    //특정 id 조회
    public Store findById(Long store_id){
        return storeRepository.findById(store_id)
                .orElseThrow(()-> new IllegalArgumentException("id 값이 없습니다 id : " + store_id));
    }

}
