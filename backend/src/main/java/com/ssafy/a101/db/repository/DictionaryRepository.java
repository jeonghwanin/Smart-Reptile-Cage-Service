package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.Dictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {
}
