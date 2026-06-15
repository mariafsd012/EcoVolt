package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.ChamadoJustificativaFalta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChamadoJustificativaFaltaRepository extends JpaRepository<ChamadoJustificativaFalta, Long> {
    Optional<ChamadoJustificativaFalta> findByChamadoId(Long chamadoId);
    List<ChamadoJustificativaFalta> findByStatus(ChamadoJustificativaFalta.StatusJustificativa status);
}