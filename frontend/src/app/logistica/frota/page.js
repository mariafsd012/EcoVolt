"use client";

import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { usuarioService } from "../../ponto/controle/usuarioService";

function FrotaHeader() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(usuarioService.obterUsuarioLogado());
  }, []);

  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#222", lineHeight: 1.2 }}>
          Frota
        </h1>
        <p style={{ fontSize: "13px", color: "#8a9a85", marginTop: "4px" }}>
          Gerencie as
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "14px", color: "#4a5a45" }}>
          {usuario?.nome ? `Bem vindo, ${usuario.nome}!` : "Bem vindo!"}
        </span>
        <div style={{
          width: "36px", height: "36px", borderRadius: "50%",
          backgroundColor: "#dfe6da", display: "flex",
          alignItems: "center", justifyContent: "center",
        }} />
      </div>
    </header>
  );
}

const situacaoStyle = {
  disponivel: { background: "#eaf3de", color: "#3b6d11" },
  em_uso: { background: "#faeeda", color: "#854f0b" },
  manutencao: { background: "#fcebeb", color: "#a32d2d" },
};

const situacaoLabel = {
  disponivel: "Disponível",
  em_uso: "Em uso",
  manutencao: "Manutenção",
};

export default function FrotaPage() {
  const [veiculos, setVeiculos] = useState([]);
  const [form, setForm] = useState({
    marca: "", ano: "", placa: "", cor: "", colaborador: "", dataRetirada: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCadastrar(e) {
    e.preventDefault();
    if (!form.marca || !form.placa) return;

    const novoVeiculo = {
      id: Date.now(),
      ...form,
      situacao: "disponivel",
    };

    setVeiculos([...veiculos, novoVeiculo]);
    setForm({ marca: "", ano: "", placa: "", cor: "", colaborador: "", dataRetirada: "" });
  }

  const celulaStyle = {
    padding: "16px 24px",
    fontSize: "14px",
    color: "#333333",
    borderTop: "1px solid #eef2ea",
  };

  return (
    <div
      className="min-h-screen bg-[#f8faf7] py-8 flex flex-col gap-6"
      style={{ paddingLeft: "0.25cm", paddingRight: "0.25cm" }}
    >
      <FrotaHeader />

      {/* Formulário de cadastro */}
      <section style={{
        backgroundColor: "#c8d9be",
        borderRadius: "16px",
        padding: "24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <Truck size={22} color="#2d3a2a" />
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#2d3a2a" }}>
            Cadastrar novo veículo
          </h2>
        </div>

        <form onSubmit={handleCadastrar} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { name: "marca", placeholder: "Marca" },
              { name: "ano", placeholder: "Ano" },
              { name: "placa", placeholder: "Placa" },
              { name: "cor", placeholder: "Cor" },
            ].map(({ name, placeholder }) => (
              <input
                key={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #d4dccf",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  outline: "none",
                  color: "#333",
                }}
              />
            ))}
          </div>

          <input
            name="colaborador"
            value={form.colaborador}
            onChange={handleChange}
            placeholder="Colaborador"
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #d4dccf",
              fontSize: "14px",
              backgroundColor: "#fff",
              outline: "none",
              color: "#333",
            }}
          />

          <input
            name="dataRetirada"
            value={form.dataRetirada}
            onChange={handleChange}
            placeholder="Data de retirada"
            type="date"
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #d4dccf",
              fontSize: "14px",
              backgroundColor: "#fff",
              outline: "none",
              color: "#333",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px",
              borderRadius: "10px",
              backgroundColor: "#3a6b35",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            Cadastrar
          </button>
        </form>
      </section>

      {/* Tabela de veículos */}
      <section style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #eef2ea" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#2d3a2a" }}>
            Veículos cadastrados
          </h2>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#f3f6f0" }}>
              {["Colaborador", "Detalhamento", "Situação"].map((head) => (
                <th key={head} style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  color: "#7d8d78",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {veiculos.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ ...celulaStyle, textAlign: "center", color: "#8a9a85", padding: "40px 24px" }}>
                  Nenhum veículo cadastrado.
                </td>
              </tr>
            ) : (
              veiculos.map((v, index) => (
                <tr key={v.id} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f7faf5" }}>
                  <td style={celulaStyle}>{v.colaborador || "—"}</td>
                  <td style={celulaStyle}>
                    {v.marca} {v.ano} · {v.placa} · {v.cor}
                  </td>
                  <td style={celulaStyle}>
                    <span style={{
                      ...situacaoStyle[v.situacao],
                      padding: "4px 12px",
                      borderRadius: "99px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}>
                      {situacaoLabel[v.situacao]}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ padding: "16px 24px", textAlign: "center", borderTop: "1px solid #eef2ea" }}>
          <a href="#" style={{ fontSize: "13px", color: "#3a6b35", textDecoration: "underline" }}>
            Visualizar todos os veículos
          </a>
        </div>
      </section>
    </div>
  );
}