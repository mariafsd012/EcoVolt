package com.ecovolt.backend.repository;

import com.ecovolt.backend.model.ChamadoSuporteTI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChamadoSuporteTIRepository extends JpaRepository<ChamadoSuporteTI, Long>{
    Optional<ChamadoSuporteTI> findByChamadoId(Long chamadoId);
    List<ChamadoSuporteTI> findByCategoria(ChamadoSuporteTI.CategoriaSuporte categoria);
}