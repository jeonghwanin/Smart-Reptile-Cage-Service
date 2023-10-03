package com.ssafy.a101.api.request;


import com.ssafy.a101.db.entity.Animal;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.Dictionary;
import com.ssafy.a101.db.repository.AnimalRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor//기본생성자 설정
@AllArgsConstructor // 모든 필드 값을 파라미터로 받는 생성자 추가
@Getter
public class AddAnimalRequest {
    private Long cage_id;
    private Long dict_id;
    private  String name;
    private  String gender;
    private  Date birth;
    private  String issue;
    private  Date created_at;
    private  String photo;
    public Animal toEntity(Cage cage, Dictionary dictionary) {
        return Animal.builder()
                .cageId(cage)
                .dict_id(dictionary)
                .name(name)
                .gender(gender)
                .birth(birth)
                .issue(issue)
                .created_at(created_at)
                .photo(photo)
                .build();
    }
}
