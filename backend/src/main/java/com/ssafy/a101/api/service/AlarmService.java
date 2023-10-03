package com.ssafy.a101.api.service;


import com.ssafy.a101.api.request.AddAlarmRequest;
import com.ssafy.a101.api.request.UpdateAlarmRequest;
import com.ssafy.a101.db.entity.Alarm;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.repository.AlarmRepository;
import com.ssafy.a101.db.repository.CageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor // final  이 붙거나 @notnull  이 붙은 필드 생성자 추가
@Service //빈으로 등록
public class AlarmService {
    private final AlarmRepository alarmRepository;
    private final CageRepository cageRepository;

    // 전체조회
    public List<Alarm> findAll(Long cage_id){return alarmRepository.findByCageId_CageId(cage_id);}

    // 특정 알람 조회
    public Alarm findByid(Long arm_id){
        return alarmRepository.findById(arm_id)
                .orElseThrow(()-> new IllegalArgumentException("no"));
    }

    //알람 추가
    public Alarm save(AddAlarmRequest request) {
        Cage cage = cageRepository.findById(request.getCageId()).orElseThrow(()-> new IllegalArgumentException("no"));
        Alarm alarm = request.toEntity();
        alarm.setCageId(cage);

        return alarmRepository.save(alarm);
    }

    // 알람 수정
    @Transactional
    public Alarm update(long arm_id, UpdateAlarmRequest request){
        Alarm alarm= alarmRepository.findById(arm_id)
                .orElseThrow(()-> new IllegalArgumentException("no"));
        alarm.update(request.getName(), request.getCycle(), request.getRecent());
        return alarm;
    }

    // 알람 삭제
    public void delete(long arm_id){ alarmRepository.deleteById(arm_id);}
}
