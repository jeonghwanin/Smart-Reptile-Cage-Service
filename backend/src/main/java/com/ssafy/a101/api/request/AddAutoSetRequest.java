package com.ssafy.a101.api.request;


import com.ssafy.a101.db.entity.AutoSet;
import com.ssafy.a101.db.entity.Cage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor//기본생성자 설정
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class AddAutoSetRequest {
    private Long cageId;
    private String time;
    private Long set_temp;
    private Long set_hum;
    private Long set_uv;
    public AutoSet toEntity(){
        return AutoSet.builder()
                .time(time)
                .set_temp(set_temp)
                .set_hum(set_hum)
                .set_uv(set_uv)
                .build();
    }
}
