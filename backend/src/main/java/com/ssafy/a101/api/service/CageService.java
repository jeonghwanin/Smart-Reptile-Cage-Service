package com.ssafy.a101.api.service;


import com.ssafy.a101.api.request.AddCageRequest;
import com.ssafy.a101.api.request.UpdateCageRequest;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.User;
import com.ssafy.a101.db.repository.CageRepository;
import com.ssafy.a101.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CageService {
    private final CageRepository cageRepository;
    private final UserRepository userRepository;

    // 케이지 전체 조회
    public List<Cage> findAll(Long id){return cageRepository.findById_Id(id);}

    // 특정 케이지 조회
    public Cage findById(Long cage_id){
        return cageRepository.findById(cage_id)
                .orElseThrow(()-> new IllegalArgumentException("값이 없네용"));
    }

    // 케이지 추가
    public Cage save(AddCageRequest request) {
        User user = userRepository.findById(request.getId()).orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));
        Cage cage = request.toEntity(cageRepository);
        cage.setId(user);
        return cageRepository.save(cage);
    }

    // 케이지 수정
    @Transactional
    public Cage update(long cage_id, UpdateCageRequest request) {
        Cage cage = cageRepository.findById(cage_id)
                .orElseThrow(() -> new IllegalArgumentException("Cage not found"));

        cage.update(request.getCage_name(), request.getSnum(), request.getSet_temp(), request.getSet_hum(), request.getSet_uv(), request.getCreated_at(), request.getCategory());

        return cage;
    }
    // 환경 수정
    @Transactional
    public Cage updateEnv(long cage_id, UpdateCageRequest request) {
        Cage cage = cageRepository.findById(cage_id)
                .orElseThrow(() -> new IllegalArgumentException("Cage Not Found"));
        cage.updateEnv(request.getSet_temp(), request.getSet_hum(), request.getSet_uv());

        return cage;
    }

    // 케이지 삭제
    public void delete(Long cage_id){cageRepository.deleteById(cage_id);}
}
