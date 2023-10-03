package com.ssafy.a101.api.service;


import com.ssafy.a101.db.entity.Dictionary;
import com.ssafy.a101.db.repository.DictionaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor // final  이 붙거나 @notnull  이 붙은 필드 생성자 추가
@Service //빈으로 등록
public class DictionaryService {

    private  final DictionaryRepository dictionaryRepository;

    //전체 조회
    public List<Dictionary> findAll(){ return dictionaryRepository.findAll();}


    // 특정 도감 조회
    public Dictionary findById(Long id){
        return dictionaryRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("조회안됨"));
    }

}
