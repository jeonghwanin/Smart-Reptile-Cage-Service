package com.ssafy.a101.api.service;
import com.ssafy.a101.api.request.AddAutoSetRequest;
import com.ssafy.a101.api.request.UpdateAutoSetRequest;
import com.ssafy.a101.db.entity.AutoSet;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.repository.AutoSetRepository;
import com.ssafy.a101.db.repository.CageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.ejb.Schedule;
import java.sql.Time;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RequiredArgsConstructor // final  이 붙거나 @notnull  이 붙은 필드 생성자 추가
@Service //빈으로 등록
public class AutoSetService {
    private final AutoSetRepository autoSetRepository;
    private final CageRepository cageRepository;

    // 전체 세팅 값 조회
    public List<AutoSet> findALL(Long cage_id) {return autoSetRepository.findByCageId_CageId(cage_id);}


    // 특정 값 세팅 값 조회
    public AutoSet findById(Long id){
        return autoSetRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("업습니다."));
    }

    // 세팅 추가
    public AutoSet save(AddAutoSetRequest request){
        Cage cage = cageRepository.findById(request.getCageId()).orElseThrow(()-> new IllegalArgumentException("cage error"));
        AutoSet auto_set = request.toEntity();
        auto_set.setCageId(cage);
        return autoSetRepository.save(auto_set);
    }

    // 세팅 수정
    @Transactional
    public AutoSet update(long id, UpdateAutoSetRequest request){
        AutoSet auto_set = autoSetRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException(" wrong update"));
        auto_set.update(request.getTime(), request.getSet_temp(),  request.getSet_hum(), request.getSet_uv());
        return auto_set;
    }

    // 세팅 삭제
    public void delete(long id){autoSetRepository.deleteById(id);}
}
