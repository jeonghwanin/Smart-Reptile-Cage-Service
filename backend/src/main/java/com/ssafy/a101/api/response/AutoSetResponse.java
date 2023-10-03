package com.ssafy.a101.api.response;

import com.ssafy.a101.db.entity.AutoSet;
import com.ssafy.a101.db.entity.Cage;
import lombok.Getter;

import java.sql.Time;
import java.util.Date;

@Getter
public class AutoSetResponse {
    private final  Long set_id;
    private final String time;
    private final Long cageId;
    private final Long set_temp;
    private final Long set_hum;
    private final Long set_uv;

    public AutoSetResponse(AutoSet auto_set){
        this.set_id = auto_set.getSet_id();
        this.time = auto_set.getTime();
        this.cageId = auto_set.getCageId();
        this.set_temp = auto_set.getSet_temp();
        this.set_hum = auto_set.getSet_hum();
        this.set_uv = auto_set.getSet_uv();
    }
}
