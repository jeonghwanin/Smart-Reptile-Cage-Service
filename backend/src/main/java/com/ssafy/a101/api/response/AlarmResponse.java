package com.ssafy.a101.api.response;

import com.ssafy.a101.db.entity.Alarm;
import com.ssafy.a101.db.entity.Cage;
import lombok.Getter;

import java.util.Date;

@Getter
public class AlarmResponse {
    private final  Long arm_id;
    private final Long cageId;
    private final String name;
    private final Long cycle;
    private final Date recent;

    public AlarmResponse(Alarm alarm){
        this.arm_id = alarm.getArm_id();
        this.cageId = alarm.getCageId();
        this.name = alarm.getName();
        this.cycle = alarm.getCycle();
        this.recent = alarm.getRecent();
    }

}
