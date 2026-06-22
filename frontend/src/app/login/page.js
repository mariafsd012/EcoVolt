"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import styles from "./login.module.css";
import { Comfortaa } from "next/font/google";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const router = useRouter();

    async function handleLogin(e) {
        e.preventDefault();
        setErro("");

        try {
            const resposta = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                senha
            });

            const { token, nome, papel } = resposta.data;

            localStorage.setItem("token", token);
            localStorage.setItem("nome", nome);
            localStorage.setItem("papel", papel);

            router.push("/dashboard");
        } catch (err) {
            setErro("Email ou senha incorretos.");
        }
    }

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

                <form className={styles.form} onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Digite o seu email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Digite a sua senha"
                        className={styles.input}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {erro && <p style={{ color: "red", fontSize: "14px" }}>{erro}</p>}

                    <button type="submit" className={styles.button}>
                        Acessar
                    </button>
                </form>

                <Link href="/esqueceu-senha" className={styles.forgotPasswordLink}>
                    Esqueceu sua senha?
                </Link>
            </div>
        </div>
    );
}