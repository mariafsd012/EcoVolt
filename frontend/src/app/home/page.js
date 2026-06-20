import Link from "next/link";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img
            src="/logo.png"
            alt="EcoVolt Logo"
            className={styles.logoImage}
          />
        </div>

        <div className={styles.navLinks}>
          <Link href="/sobre">Sobre nós</Link>
          <Link href="/contatos">Contatos</Link>
        </div>
      </nav>

      {/* Ondulação SVG */}
      <img
        src="/ondulacao.png"
        alt=""
        className={styles.wave}
      />

      {/* Hero */}
      <main className={styles.hero}>
        <div className={styles.illustration}>
          <img
            src="/turbinas-sem-fundo.png"
            alt="Energia limpa com turbinas eólicas"
          />
        </div>

        <div className={styles.heroText}>
          <p>
            <strong>Olá!</strong> Como está?
            <br />
            Bem vindo(a) a
            <br />
            <strong className={styles.brand}>EcoVolt</strong>
          </p>

          <Link href="/login" className={styles.btn}>
            Entrar
          </Link>
        </div>
      </main>
    </div>
  );
}