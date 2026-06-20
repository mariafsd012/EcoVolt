package com.ecovolt.backend.controller;

import com.ecovolt.backend.dto.CadastroRequest;
import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.service.ColaboradorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/colaboradores")
public class ColaboradorController{

    private final ColaboradorService colaboradorService;

    public ColaboradorController(ColaboradorService colaboradorService){
        this.colaboradorService = colaboradorService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Colaborador> cadastrar(@RequestBody CadastroRequest request){
        Colaborador colaborador = colaboradorService.cadastrar(request);
        return ResponseEntity.ok(colaborador);
    }

}