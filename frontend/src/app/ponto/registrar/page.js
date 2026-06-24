"use client";
import { useEffect, useState } from "react";
import styles from "./registrar.module.css";
import Link from "next/link";
import Image from "next/image";
import { pontoService } from "../controle/pontoService";

export default function RegistrarPonto() {
  const [dataHora, setDataHora] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDataHora(new Date());
    const timer = setInterval(() => setDataHora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatarData = (date) => {
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
  };

  const formatarHora = (date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.turbinaWrapper}>
        <Image
          src="/turbinas-sem-fundo.png"
          alt="Turbinas eólicas"
          fill
          style={{ objectFit: "contain", objectPosition: "bottom center" }}
          priority
        />
      </div>

      <div className={styles.card}>
        <div className={styles.relogio}>
          {dataHora && (
            <>
              <h2 className={styles.data}>{formatarData(dataHora)}</h2>
              <h1 className={styles.hora}>{formatarHora(dataHora)}</h1>
            </>
          )}
        </div>
        <button
          className={styles.btnRegistrar}
          onClick={async () => {
            setIsSubmitting(true);
            setMsg("");
            setError("");
            try {
              await pontoService.registrarPonto();
              setMsg("Ponto registrado com sucesso!");
            } catch (err) {
              console.error(err);
              setError("Erro ao registrar ponto");
            } finally {
              setIsSubmitting(false);
            }
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar Ponto"}
        </button>
        {msg && (
          <div
            style={{
              marginTop: 12,
              fontWeight: 700,
              color: "#0f5132",
              background: "#e6fff0",
              padding: "8px 12px",
              borderRadius: 8,
              display: "inline-block",
            }}
          >
            {msg}
          </div>
        )}
        {error && (
          <div
            style={{
              marginTop: 12,
              fontWeight: 700,
              color: "#8b0000",
              background: "#ffe5e5",
              padding: "8px 12px",
              borderRadius: 8,
              display: "inline-block",
            }}
          >
            {error}
          </div>
        )}
        <Link href="/ponto/controle" className={styles.linkFolha}>
          Visualizar folha de ponto
        </Link>
      </div>
    </div>
  );
}