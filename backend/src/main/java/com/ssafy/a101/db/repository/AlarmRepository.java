package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.Alarm;
import com.ssafy.a101.db.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    List<Alarm> findByCageId_CageId(Long cage_id);
}
