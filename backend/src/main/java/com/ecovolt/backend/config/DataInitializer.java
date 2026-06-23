package com.ecovolt.backend.config;

import com.ecovolt.backend.model.Colaborador;
import com.ecovolt.backend.model.Papel;
import com.ecovolt.backend.repository.ColaboradorRepository;
import com.ecovolt.backend.repository.PapelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final PapelRepository papelRepository;
    private final ColaboradorRepository colaboradorRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(PapelRepository papelRepository, ColaboradorRepository colaboradorRepository, PasswordEncoder passwordEncoder) {
        this.papelRepository = papelRepository;
        this.colaboradorRepository = colaboradorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Cria papéis básicos se não existirem
        for (Papel.NomePapel nome : Papel.NomePapel.values()) {
            if (!papelRepository.existsByNome(nome)) {
                Papel p = new Papel();
                p.setNome(nome);
                papelRepository.save(p);
            }
        }

        // Cria usuário admin para testes
        String adminEmail = "admin@local";
        if (colaboradorRepository.findByEmail(adminEmail).isEmpty()) {
            Colaborador admin = new Colaborador();
            admin.setNome("Administrador");
            admin.setEmail(adminEmail);
            admin.setSenha(passwordEncoder.encode("admin123"));

            List<Papel> roles = new ArrayList<>();
            papelRepository.findByNome(Papel.NomePapel.ROLE_ADMIN_TI).ifPresent(roles::add);
            papelRepository.findByNome(Papel.NomePapel.ROLE_ANALISTA_PONTO).ifPresent(roles::add);
            admin.setPapeis(roles);

            colaboradorRepository.save(admin);
        }
    }
}
