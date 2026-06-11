package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
    Optional<Colaborador> findByEmail(String email);
    Optional<Colaborador> findByCpf (String cpf);
    List<Colaborador> findByNomeContainingIgnoreCase(String nome);
}