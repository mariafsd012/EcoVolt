"use client";

import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import {
  Clock, Users, Home, Monitor, Truck, ShieldCheck,
  Bell, Calendar, ChevronRight, Megaphone,
  ClockArrowUp, BookOpen, UserCheck,
  Building2, UserRound, Package, Wrench,
  AlertTriangle, ClipboardCheck, HardHat,
} from "lucide-react";

function pad(n) { return String(n).padStart(2, "0"); }

const departamentos = [
  {
    nome: "Ponto",
    icon: Clock,
    cor: "#16a34a",
    indicadores: [
      { icon: ClockArrowUp, label: "Horas extras acumuladas",     valor: "+16h 20m", alerta: false },
      { icon: Clock,        label: "Banco de horas",              valor: "+12h 30m", alerta: false },
      { icon: UserCheck,    label: "Colaboradores com pendências", valor: "5",        alerta: true  },
    ],
  },
  {
    nome: "DHO",
    icon: Users,
    cor: "#7c3aed",
    indicadores: [
      { icon: Users,     label: "Colaboradores ativos",   valor: "312", alerta: false },
      { icon: BookOpen,  label: "Treinamentos pendentes", valor: "8",   alerta: true  },
      { icon: UserCheck, label: "Benefícios ativos",      valor: "290", alerta: false },
    ],
  },
  {
    nome: "Moradia",
    icon: Home,
    cor: "#0284c7",
    indicadores: [
      { icon: Building2, label: "Casas ocupadas",   valor: "45",  alerta: false },
      { icon: UserRound, label: "Moradores ativos", valor: "128", alerta: false },
      { icon: Package,   label: "Contas pendentes", valor: "3",   alerta: true  },
    ],
  },
  {
    nome: "TI",
    icon: Monitor,
    cor: "#16a34a",
    indicadores: [
      { icon: AlertTriangle,  label: "Chamados abertos",       valor: "12",  alerta: true  },
      { icon: UserCheck,      label: "Usuários ativos",        valor: "248", alerta: false },
      { icon: ClipboardCheck, label: "Solicitações pendentes", valor: "5",   alerta: true  },
    ],
  },
  {
    nome: "Frota e Logística",
    icon: Truck,
    cor: "#ea580c",
    indicadores: [
      { icon: Truck,   label: "Veículos em operação",     valor: "32", alerta: false },
      { icon: Wrench,  label: "Manutenções pendentes",    valor: "4",  alerta: true  },
      { icon: Package, label: "Itens em estoque crítico", valor: "7",  alerta: true  },
    ],
  },
  {
    nome: "EHS e Campo",
    icon: ShieldCheck,
    cor: "#0284c7",
    indicadores: [
      { icon: AlertTriangle,  label: "Ocorrências abertas",       valor: "3",  alerta: true  },
      { icon: ClipboardCheck, label: "Inspeções realizadas",      valor: "18", alerta: false },
      { icon: HardHat,        label: "EPIs em falta ou vencendo", valor: "6",  alerta: true  },
    ],
  },
];

const avisos = [
  { titulo: "Reunião geral da empresa", detalhe: "23/05 às 10:00" },
  { titulo: "Treinamento obrigatório",  detalhe: "Segurança no trabalho" },
];

// ── Card de departamento ──
function DepCard({ dep }) {
  return (
    <div className={styles.depCard}>
      <div className={styles.depHeader}>
        <div
          className={styles.depIconWrap}
          style={{ background: dep.cor + "18", color: dep.cor }}
        >
          <dep.icon size={17} strokeWidth={2} />
        </div>
        <span className={styles.depNome}>{dep.nome}</span>
      </div>

      <div className={styles.depIndicadores}>
        {dep.indicadores.map(({ icon: Icon, label, valor, alerta }) => (
          <div key={label} className={styles.indicador}>
            <div className={styles.indicadorIcon} style={{ color: dep.cor }}>
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <div>
              <p className={`${styles.indicadorValor} ${alerta ? styles.indicadorAlerta : ""}`}>
                {valor}
              </p>
              <p className={styles.indicadorLabel}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.verDetalhes}>
        Ver detalhes <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ── Componente principal ──
export default function Dashboard() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hora = now
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}`
    : "--:--";

  const data = now
    ? now.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "";

  return (
    <div className={styles.dash}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerUser}>
          <h1 className={styles.headerNome}>Olá, Luiza Sousa</h1>
          <p className={styles.headerSub}>Analista de DHO &nbsp;•&nbsp; DHO</p>
        </div>

        <div className={styles.headerRight}>
          {now && (
            <div className={styles.headerData}>
              <Calendar size={20} strokeWidth={1.8} className={styles.headerDataIcon} />
              <div>
                <p className={styles.headerDataTexto}>{data}</p>
                <p className={styles.headerHora}>{hora}</p>
              </div>
            </div>
          )}

          <button className={styles.notifBtn}>
            <Bell size={20} strokeWidth={1.8} />
            <span className={styles.notifBadge}>3</span>
          </button>

          {/* Avatar — troque a src pela foto real do usuário */}
          <div className={styles.avatarFoto}>
            {/* Se tiver URL de foto: */}
            {/* <img src="/avatar-luiza.jpg" alt="Luiza Sousa" className={styles.avatarImg} /> */}
            {/* Fallback com inicial: */}
            <div className={styles.avatarInitial}>L</div>
            <span className={styles.avatarOnline} />
          </div>
        </div>
      </header>

      {/* ── Conteúdo ── */}
      <main className={styles.main}>

        {/* Linha 1 — 3 deps + avisos */}
        <div className={styles.gridTop}>
          {departamentos.slice(0, 3).map((dep) => (
            <DepCard key={dep.nome} dep={dep} />
          ))}

          <div className={styles.avisosCard}>
            <div className={styles.depHeader}>
              <div className={styles.depIconWrap} style={{ background: "#fef9c3", color: "#ca8a04" }}>
                <Megaphone size={17} strokeWidth={2} />
              </div>
              <span className={styles.depNome}>Avisos importantes</span>
            </div>

            <div className={styles.avisosList}>
              {avisos.map((a) => (
                <div key={a.titulo} className={styles.avisoItem}>
                  <div>
                    <p className={styles.avisoTitulo}>{a.titulo}</p>
                    <p className={styles.avisoDetalhe}>{a.detalhe}</p>
                  </div>
                  <ChevronRight size={14} className={styles.avisoArrow} />
                </div>
              ))}
            </div>

            <button className={styles.verTodos}>Ver todos os avisos</button>
          </div>
        </div>

        {/* Linha 2 — 3 deps */}
        <div className={styles.gridBottom}>
          {departamentos.slice(3).map((dep) => (
            <DepCard key={dep.nome} dep={dep} />
          ))}
        </div>

      </main>

      <footer className={styles.footer}>
        © 2025 EcoVolt. Todos os direitos reservados.
      </footer>
    </div>
  );
}