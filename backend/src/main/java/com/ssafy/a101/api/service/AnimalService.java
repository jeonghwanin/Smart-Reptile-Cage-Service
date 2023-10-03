package com.ssafy.a101.api.service;


import com.ssafy.a101.api.request.AddAnimalRequest;
import com.ssafy.a101.api.request.UpdateAnimalRequest;
import com.ssafy.a101.db.entity.Animal;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.Dictionary;
import com.ssafy.a101.db.repository.AnimalRepository;
import com.ssafy.a101.db.repository.CageRepository;
import com.ssafy.a101.db.repository.DictionaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor // final  이 붙거나 @notnull  이 붙은 필드 생성자 추가
@Service //빈으로 등록
public class AnimalService {
    private final AnimalRepository animalRepository;
    private final DictionaryRepository dictionaryRepository;
    private final CageRepository cageRepository;

    // 전체 동물 조회
    public List<Animal> findAll(Long cage_id){ return  animalRepository.findByCageId_CageId(cage_id); }

    // 특정 동물 조회
    public Animal findById(Long id) {
        return animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
    }

    // 동물 추가
    public Animal save(AddAnimalRequest request) {
        Cage cage = cageRepository.findById(request.getCage_id())
                .orElseThrow(() -> new IllegalArgumentException("해당 케이지를 찾을 수 없습니다."));
        Dictionary dictionary = dictionaryRepository.findById(request.getDict_id())
                .orElseThrow(() -> new IllegalArgumentException("해당 딕셔너리를 찾을 수 없습니다."));
        Animal animal = request.toEntity(cage, dictionary);
        return animalRepository.save(animal);
    }

    // 동물 정보 수정
    @Transactional
    public Animal update(long id, UpdateAnimalRequest request){
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found 업데이트: " + id));
        animal.update(request.getName(), request.getGender(), request.getBirth(), request.getIssue(), request.getCreated_at(), request.getPhoto());
        return animal;
    }

    // 동물 삭제
    public void delete(long id){
        animalRepository.deleteById(id);
    }
}
