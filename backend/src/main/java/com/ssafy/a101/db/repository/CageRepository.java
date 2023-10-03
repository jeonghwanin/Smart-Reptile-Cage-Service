package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CageRepository extends JpaRepository<Cage, Long> {
    List<Cage> findById_Id(Long userId);
}
