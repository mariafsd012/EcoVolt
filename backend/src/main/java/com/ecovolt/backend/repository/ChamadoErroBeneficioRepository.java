package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.ChamadoErroBeneficio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChamadoErroBeneficioRepository extends JpaRepository<ChamadoErroBeneficio, Long>{
    Optional<ChamadoErroBeneficio> findByChamadoId(Long chamadoId);
}