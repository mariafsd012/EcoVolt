package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.ChamadoAjustePonto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChamadoAjustePontoRepository extends JpaRepository<ChamadoAjustePonto, Long> {
    Optional<ChamadoAjustePonto> findByChamadoId(Long chamadoId);
    List<ChamadoAjustePonto> findByStatus(ChamadoAjustePonto.StatusAjustePonto status);
}
