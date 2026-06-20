package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
    List<Chamado> findByColaboradorId(Long colaboradorId);
    List<Chamado> findByTipo(Chamado.TipoChamado tipo);
    List<Chamado> findByCriadoEmBetween(LocalDateTime inicio, LocalDateTime fim);
}