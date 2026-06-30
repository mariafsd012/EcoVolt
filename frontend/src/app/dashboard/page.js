"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { apiClient } from "../../../apiClient";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await apiClient.get("/api/ponto/dashboard");
        setDashboard(data);
      } catch (err) {
        setError(err?.message || "Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  if (loading) return <div className={styles.dash}>Carregando...</div>;
  if (error) return <div className={styles.dash}>Erro: {error}</div>;

  const { colaborador, horasTotais, horasExtras, horasFaltantes, desempenho } = dashboard;
  const notaFinal = desempenho?.notaFinal ?? 0;

  function getDesempenhoLabel(score) {
    if (score >= 70) return "";
    if (score >= 50) return "";
    return "";
  }

  function getDesempenhoClass(score) {
    if (score >= 70) return styles.desempenhoBom;
    if (score >= 50) return styles.desempenhoMedio;
    return styles.desempenhoRuim;
  }

  return (
    <div className={styles.dash}>
      <div className={styles.contentGrid}>
        
        <section className={styles.card}>
          <div className={styles.perfilHeader}>
            <div className={styles.avatarLarge}>
              {colaborador?.nome?.slice(0, 2).toUpperCase() || "RL"}
            </div>
            <div>
              <p style={{ margin: 0, color: '#4a5a47' }}>Olá,</p>
              <h1 className={styles.nomeUsuario}>{colaborador?.nome || "Usuário"}</h1>
              <div>
                <span className={styles.badge}>{colaborador?.cargo || "Técnico"}</span>
                <span className={styles.badge}>{colaborador?.setor || "Campo"}</span>
              </div>
            </div>
          </div>

          <h2 className={styles.tituloBanco}>Resumo do Banco de Horas</h2>

          <div className={styles.horasGrid}>
            <div className={styles.horasCard}>
              <div className={styles.horasLabel}>HT</div>
              <div className={styles.horasValor}>{horasTotais || "0h"}</div>
            </div>
            <div className={styles.horasCard}>
              <div className={styles.horasLabel}>HE</div>
              <div className={styles.horasValor} style={{ color: '#16a34a' }}>{horasExtras || "0h"}</div>
            </div>
            <div className={styles.horasCard}>
              <div className={styles.horasLabel}>HF</div>
              <div className={styles.horasValor} style={{ color: '#dc2626' }}>{horasFaltantes || "0h"}</div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.desempenhoCard}`}>
          <h3 style={{ margin: 0, color: '#2d3a2a' }}>Desempenho</h3>
          <p style={{ color: '#4a5a47', fontSize: '14px' }}>Sua nota geral na empresa</p>
          
          <div 
            className={`${styles.circulo} ${getDesempenhoClass(notaFinal)}`}
            style={{ '--progresso': `${notaFinal}%` }}
          >
            <span className={styles.notaValor}>{notaFinal}</span>
            <span className={styles.notaSub}>de 100</span>
          </div>
          
          <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#2d3a2a' }}>
            {getDesempenhoLabel(notaFinal)}
          </p>
        </section>

      </div>
    </div>
  );
}