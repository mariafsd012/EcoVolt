export const usuarioService = {
  obterUsuarioLogado() {
    if (typeof window === "undefined") return null;

    const nome = window.localStorage.getItem("ecovolt_nome");
    if (!nome) return null;

    return { nome };
  },
};