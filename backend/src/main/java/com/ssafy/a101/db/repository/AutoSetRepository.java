package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.AutoSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AutoSetRepository extends JpaRepository<AutoSet, Long> {
    List<AutoSet> findByCageId_CageId(Long cage_id);
}
