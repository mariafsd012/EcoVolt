package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.Papel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PapelRepository extends JpaRepository<Papel, Long> {
    Optional<Papel> findByNome(Papel.NomePapel nome);
    boolean existsByNome(Papel.NomePapel nome);
}