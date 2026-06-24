package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.RegistroPonto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RegistroPontoRepository extends JpaRepository<RegistroPonto, Long> {
    
    // Busca o histórico para a tabela (do mais recente para o mais antigo)
    List<RegistroPonto> findByColaboradorIdOrderByDataHoraRegistroDesc(Long colaboradorId);
    
    // Busca o histórico ordenado por data/hora crescente (necessário para o agrupamento do DTO)
    List<RegistroPonto> findByColaboradorIdOrderByDataHoraRegistroAsc(Long colaboradorId);
    
    // Método para a lógica de controle de 4 registros diários
    List<RegistroPonto> findByColaboradorIdAndDataHoraRegistroBetweenOrderByDataHoraRegistroAsc(
            Long colaboradorId, LocalDateTime inicio, LocalDateTime fim);
    
    // Métodos auxiliares
    List<RegistroPonto> findByColaboradorId(Long colaboradorId);
    List<RegistroPonto> findByDataHoraRegistroBetween(LocalDateTime inicio, LocalDateTime fim);
    List<RegistroPonto> findByColaboradorIdAndDataHoraRegistroBetween(Long colaboradorId, LocalDateTime inicio, LocalDateTime fim);
}