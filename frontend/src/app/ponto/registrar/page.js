"use client";
import { useEffect, useState } from "react";
import styles from "./registrar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function RegistrarPonto() {
  const [dataHora, setDataHora] = useState(null);

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
          onClick={() => alert("Ponto registrado!")}
        >
          Registrar Ponto
        </button>
        <Link href="/Ponto/controle" className={styles.linkFolha}>
          Visualizar folha de ponto
        </Link>
      </div>
    </div>
  );
}