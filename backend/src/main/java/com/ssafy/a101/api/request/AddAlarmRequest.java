package com.ssafy.a101.api.request;

import com.ssafy.a101.db.entity.Alarm;
import com.ssafy.a101.db.entity.Cage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor//기본생성자 설정
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class AddAlarmRequest {
    private Long cageId;
    private String name;
    private Long cycle;
    private Date recent;
    public Alarm toEntity(){
        return Alarm.builder()
                .name(name)
                .cycle(cycle)
                .recent(recent)
                .build();
    }
}
