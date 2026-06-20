import Link from "next/link";
import styles from "./login.module.css";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ subsets: ["latin"] });


export default function LoginPage() {
    return (
        <div className={styles.container}>
            <Link href="/home" className={styles.backButton}>
                ←
            </Link>
            <div className={styles.card}>
                <h1 className={styles.title}>
                    <strong>Login</strong>
                </h1>

                <p className={styles.subtitle}>
                    Digite as suas informações
                </p>

                <form className={styles.form}>
                    <input
                        type="email"
                        placeholder="Digite o seu email"
                        className={styles.input}
                    />

                    <input
                        type="password"
                        placeholder="Digite a sua senha"
                        className={styles.input}
                    />
                    
                    <button type="submit" className={styles.button}>
                       <Link href="/dashboard" className={styles.link}>
                            Acessar
                        </Link>
                    </button>
                </form>

                <Link href="/esqueceu-senha" className={styles.forgotPasswordLink}>
                    Esqueceu sua senha?
                </Link>
            </div>
        </div>
    );
}