import Link from "next/link";
import styles from "./esqueceu-senha.module.css";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function RecuperarSenhaPage() {
    return (
        <div className={styles.container}>
            <Link href="/home" className={styles.backButton}>
                ←
            </Link>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    <strong>Recuperar senha</strong>
                </h1>

                <p className={styles.description}> 
                    Para recuperar a seua senha, digite o seu email corporativo.
                </p>

                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="Digite o seu email"
                        className={styles.input}
                    />
                </form>

                <button type="submit" className={styles.button}>
                    Enviar
                </button>

                <Link href="/login" className={styles.forgotPasswordLink}>
                    Voltar para o login
                </Link>
            </div>
                  <footer className={styles.footer}>
                    © 2025 EcoVolt. Todos os direitos reservados.
                  </footer>
        </div>
    );
}