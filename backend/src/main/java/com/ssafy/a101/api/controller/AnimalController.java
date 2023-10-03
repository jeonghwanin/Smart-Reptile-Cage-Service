package com.ssafy.a101.api.controller;


import com.ssafy.a101.api.request.AddAnimalRequest;
import com.ssafy.a101.api.request.UpdateAnimalRequest;
import com.ssafy.a101.api.response.AnimalResponse;
import com.ssafy.a101.api.service.AnimalService;
import com.ssafy.a101.api.service.CageService;
import com.ssafy.a101.api.service.DictionaryService;
import com.ssafy.a101.db.entity.Animal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController // http response blog  에 객체 데이터를 json  형식으로 반환하는 컨트롤러
@CrossOrigin("*")
public class AnimalController {
    private final AnimalService animalService;
    private final DictionaryService dictionaryService;
    private final CageService cageService;

    // 전체 조회
    @GetMapping("/api/{cage_id}/animals")
    public ResponseEntity<List<AnimalResponse>> findAllAnimals(@PathVariable long cage_id){
        List<AnimalResponse> animals = animalService.findAll(cage_id)
                .stream()
                .map(AnimalResponse::new)
                //.toList()  .//자바 16 이상 사용가능
                .collect(Collectors.toList()); // 위랑 같은 기능
        return ResponseEntity.ok()
                .body(animals);
    }

    // 특정 동물 조회
    @GetMapping("/api/animal/{id}")
    public ResponseEntity<AnimalResponse> fingAnimal(@PathVariable long id){
        Animal animal = animalService.findById(id);
        return ResponseEntity.ok()
                .body(new AnimalResponse(animal));
    }
    
    // 동물 추가
    @PostMapping("/api/animal")
    //요청 본문 값 매핑
    public ResponseEntity<Animal> addAnimal(@RequestBody AddAnimalRequest request){
        Animal savedAnimal = animalService.save(request);
        //요청한 자원이 성공적으로 생성되었으며 저장된 블로그 글 정보를 응답객체에 담아 전송
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedAnimal);
    }
    
    // 동물 정보 수정
    @PutMapping("/api/animal/{id}")
    public ResponseEntity<Animal> updateAnimal(@PathVariable long id,
                                                 @RequestBody UpdateAnimalRequest request) {
        Animal updatedAnimal = animalService.update(id, request);
        return ResponseEntity.ok()
                .body(updatedAnimal);
    }

    // 동물 삭제
    @DeleteMapping("/api/animal/{id}")
    public ResponseEntity<Void> deleteAnimal(@PathVariable long id) {
        animalService.delete(id);
        return ResponseEntity.ok()
                .build();
    }
}
