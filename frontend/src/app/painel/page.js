"use client";
import styles from "./painel.module.css";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

export default function PainelColaborador() {
  return (
    <div className={styles.painelContainer}>
      <header className={styles.headerRow}>
        <div>
          <h1 className={styles.tituloPainel}>Painel do Colaborador</h1>
          <p className={styles.subtitulo}>Acompanhe sua alocação, histórico e treinamentos.</p>
        </div>
        <div className={styles.userBadge}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>Bem vindo, Maria Luiza!</p>
            <p style={{ margin: 0, fontSize: '12px' }}>Eletricista de Campo</p>
          </div>
          <div className={styles.avatar}>ML</div>
        </div>
      </header>

      <section className={styles.card}>
        <span className={styles.labelSection}>ALOCAÇÃO ATUAL</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Briefcase color="#3a6b35" size={24} />
          <div>
            <h3 style={{ margin: 0 }}>Subestação Norte — Manutenção</h3>
            <p style={{ margin: 0, color: '#667064' }}>Subestação SE-04, Distrito Industrial</p>
          </div>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.card}>
          <span className={styles.labelSection}>TREINAMENTOS REALIZADOS</span>
          <div className={styles.itemLista}><CheckCircle size={16} /> NR-10 — Segurança em Eletricidade</div>
        </section>
        <section className={styles.card}>
          <span className={styles.labelSection}>TREINAMENTOS PENDENTES</span>
          <div className={styles.itemLista}><Clock size={16} /> NR-33 — Espaços Confinados</div>
        </section>
      </div>

      <section className={styles.card}>
        <span className={styles.labelSection}>ÚLTIMAS ALOCAÇÕES</span>
        <div className={styles.itemLista}>Linha de Transmissão LT-230 — Sorocaba — SP</div>
      </section>
    </div>
  );
}