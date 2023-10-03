package com.ssafy.a101.api.response;

import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.User;
import lombok.Getter;

import java.util.Date;

@Getter
public class CageResponse {
    private final Long id;
    private final Long cageId;
    private final String snum;
    private final String cage_name;
    private final Long set_temp;
    private final Long set_hum;
    private final Long set_uv;
    private final Date created_at;
    private final String category;


    public CageResponse(Cage cage) {
//        this.id = cage.getId();
        this.id = cage.getUserId();
        this.cageId = cage.getCageId();
        this.cage_name = cage.getCage_name();
        this.snum = cage.getSnum();
        this.set_temp = cage.getSet_temp();
        this.set_hum = cage.getSet_hum();
        this.set_uv = cage.getSet_uv();
        this.created_at = cage.getCreated_at();
        this.category = cage.getCategory();
    }
}
