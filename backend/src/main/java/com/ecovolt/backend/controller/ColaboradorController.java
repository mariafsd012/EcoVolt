package com.ecovolt.backend.controller;

import com.ecovolt.backend.dto.CadastroRequest;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.service.ColaboradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/colaboradores")
@CrossOrigin(origins = "http://localhost:3000")
public class ColaboradorController {

    private final ColaboradorService colaboradorService;

    public ColaboradorController(ColaboradorService colaboradorService) {
        this.colaboradorService = colaboradorService;
    }

    @GetMapping
    public ResponseEntity<List<Colaborador>> listarFiltrado(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String setor) {
        
        // Você deve criar/ajustar o método listarFiltrado no seu Service
        return ResponseEntity.ok(colaboradorService.listarFiltrado(nome, setor));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Colaborador> cadastrar(@RequestBody CadastroRequest request) {
        return ResponseEntity.ok(colaboradorService.cadastrar(request));
    }
}