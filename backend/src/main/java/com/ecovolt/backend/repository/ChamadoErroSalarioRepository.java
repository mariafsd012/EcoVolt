package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.ChamadoErroSalario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Repository
public interface ChamadoErroSalarioRepository extends JpaRepository<ChamadoErroSalario, Long>{
    Optional<ChamadoErroSalario> findByChamadoId(Long chamadoId);
    List<ChamadoErroSalario> findByCompetencia(LocalDate competencia);
}