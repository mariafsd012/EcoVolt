package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.RegistroPonto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RegistroPontoRepository extends JpaRepository<RegistroPonto, Long> {
    List<RegistroPonto> findByColaboradorId(Long colaboradorId);
    List<RegistroPonto> findByDataHoraRegistroBetween(LocalDateTime inicio, LocalDateTime fim);
    List<RegistroPonto> findByColaboradorIdAndDataHoraRegistroBetween(Long colaboradorId, LocalDateTime inicio, LocalDateTime fim);
}