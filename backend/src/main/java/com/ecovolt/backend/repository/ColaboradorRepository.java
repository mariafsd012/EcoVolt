package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
    
    Optional<Colaborador> findByEmail(String email);
    Optional<Colaborador> findByCpf (String cpf);
    
    // Métodos para filtragem
    List<Colaborador> findByNomeContainingIgnoreCase(String nome);
    List<Colaborador> findBySetor(String setor);
    
    // MÉTODO NOVO: Necessário para o filtro combinado no Service
    List<Colaborador> findByNomeContainingIgnoreCaseAndSetor(String nome, String setor);
    
    List<Colaborador> findByEscalaId(Long escalaId);
}