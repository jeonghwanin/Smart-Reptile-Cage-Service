package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.Animal;
import com.ssafy.a101.db.entity.AutoSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByCageId_CageId(Long cage_id);
}
