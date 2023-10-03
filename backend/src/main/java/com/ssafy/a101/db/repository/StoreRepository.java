package com.ssafy.a101.db.repository;

import com.ssafy.a101.db.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
