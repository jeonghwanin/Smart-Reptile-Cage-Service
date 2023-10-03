package com.ssafy.a101.api.response;


import com.ssafy.a101.db.entity.Animal;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.Dictionary;
import lombok.Getter;

import java.util.Date;

@Getter
public class AnimalResponse {
    private final Long id;
    private final Long cageId;
    private final Long dict_id;
    private final String name;
    private final String gender;
    private final Date birth;
    private final String issue;
    private final Date created_at;
    private final String photo;

    public AnimalResponse(Animal animal){
        this.id =  animal.getId();
        this.cageId = animal.getCageId();
        this.dict_id = animal.getDictId();
        this.name = animal.getName();
        this.gender = animal.getGender();
        this.birth = animal.getBirth();
        this.issue = animal.getIssue();
        this.created_at =  animal.getCreated_at();
        this.photo =  animal.getPhoto();

    }
}
