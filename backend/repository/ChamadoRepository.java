package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.TipoChamado;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
    List<Chamado> findByColaboradorId(Long colaboradorId);
    List<Chamado> findByTipo(TipoChamado tipo);
    List<Chamado> findByCriadoEmBetween(LocalDateTime inicio, LocalDateTime fim);
}