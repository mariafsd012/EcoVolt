package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.BancoHoras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BancoHorasRepository extends JpaRepository<BancoHoras, Long> {
    Optional<BancoHoras> findByColaboradorId(Long colaboradorId);
}