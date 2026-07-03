"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import {
  UserRound, Clock, Users, LogOut,
  Home, Monitor, Truck, ShieldCheck, Headphones,
  ClockArrowUp, FileText, Palmtree, BarChart2, PlusCircle,
  MapPin, GraduationCap, Handshake, ClipboardList, Package,
  Gift, Target,
} from "lucide-react";

const subMenus = {
  "/ponto": [
    { href: "/ponto/registrar", icon: PlusCircle, label: "Registrar Ponto" },
    { href: "/ponto/controle", icon: ClockArrowUp, label: "Controle de Ponto" },
    { href: "/ponto/justificativa", icon: FileText, label: "Justificativas" },
    { href: "/ponto/ferias-folgas", icon: Palmtree, label: "Férias e Folgas" },],
  "/dho": [
    { href: "/dho/beneficios-desempenho", icon: Users, label: "Benefícios e Desempenho" },
    { href: "/dho/meu-rh", icon: UserRound, label: "Meu RH" },
  ],
  "/ehs": [
    { href: "/ehs/campo", icon: MapPin, label: "Campo" },
    { href: "/ehs/treinamentos", icon: GraduationCap, label: "Treinamentos" },
    { href: "/ehs/equipes", icon: Handshake, label: "Equipes" }
  ],
  "/logistica": [
    { href: "/logistica/frota", icon: Truck, label: "Frota" },
    { href: "/logistica/estoque", icon: Package, label: "Estoque" },
  ],
};

const menuItems = [
  { href: "/dashboard", icon: UserRound, label: "Usuário" },
  { href: "/ponto", icon: Clock, label: "Ponto" },
  { href: "/dho", icon: Users, label: "DHO" },
  { href: "/moradia", icon: Home, label: "Moradia" },
  { href: "/ti", icon: Monitor, label: "T.I" },
  { href: "/logistica", icon: Truck, label: "Logística" },
  { href: "/ehs", icon: ShieldCheck, label: "EHS" },
  { href: "/relatorios", icon: ClipboardList, label: "Relatórios" },
  { href: "/suporte", icon: Headphones, label: "Suporte" },
];

function subscribeToPapel(callback) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getPapelSnapshot() {
  return window.localStorage.getItem("papel") || "";
}

function getPapelServerSnapshot() {
  return "";
}

function findParentPath(pathname) {
  return Object.keys(subMenus).find((key) => pathname.startsWith(key)) || null;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState(() => findParentPath(pathname));
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setActiveSection(findParentPath(pathname));
  }

  const papel = useSyncExternalStore(subscribeToPapel, getPapelSnapshot, getPapelServerSnapshot);
  const isAnalistaPonto = papel === "ROLE_ANALISTA_PONTO";

  const handleItemClick = (href) => {
    if (subMenus[href]) {
      setActiveSection(activeSection === href ? null : href);
    } else {
      router.push(href);
    }
  };

  const subItems = activeSection ? subMenus[activeSection] : [];
  const activeSectionLabel = menuItems.find((m) => m.href === activeSection)?.label;

  // Entre os itens do submenu que "batem" com o pathname atual,
  // só o href mais específico (mais longo) deve ficar marcado como ativo.
  const activeSubHref = subItems
    .filter((item) => pathname === item.href || pathname.startsWith(item.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? null;

  const filteredSubItems = subItems.filter((item) => {
    if (
      item.href === "/ponto/controle" ||
      item.href === "/ponto/justificativa" ||
      item.href === "/ponto/ferias-folgas" ||
      item.href === "/ponto/relatorio"
    ) {
      return isAnalistaPonto;
    }
    return true;
  });

  return (
    <>
      <aside className="
        group w-[82px] hover:w-[210px] h-screen bg-white border-r border-[#e8ede4]
        shadow-[2px_0_16px_rgba(60,90,50,0.04)] transition-all duration-300
        flex flex-col overflow-hidden rounded-r-[20px]
      ">
        <div className="h-[82px] flex items-center justify-center">
          <Image src="/logo.png" alt="EcoVolt" width={75} height={42} />
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-2 py-2">
          {menuItems.map(({ href, icon: Icon, label }) => {
            const active = subMenus[href]
              ? pathname.startsWith(href)
              : pathname === href;

            return (
              <button
                key={href}
                onClick={() => handleItemClick(href)}
                className={`
                  w-full h-[48px] flex items-center rounded-xl transition-all duration-200
                  px-0 group-hover:px-[18px]
                  ${active ? "bg-[#3a6b35]" : "hover:bg-[#eef3ea]"}
                `}
              >
                <div className="w-[52px] flex justify-center items-center flex-shrink-0">
                  <Icon size={21} strokeWidth={2.2} className={active ? "text-white" : "text-[#6a8a60]"} />
                </div>
                <span className={`
                  ml-2 whitespace-nowrap opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto
                  transition-all duration-200 text-[13.5px] font-medium
                  ${active ? "text-white" : "text-[#374f30]"}
                `}>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-[#f4f7f2] p-2">
          <button className="w-full h-[44px] flex items-center rounded-xl px-0 group-hover:px-[18px] hover:bg-[#fdecea]">
            <div className="w-[52px] flex justify-center items-center">
              <LogOut size={21} className="text-[#b05a55]" />
            </div>
            <span className="ml-2 opacity-0 w-0 overflow-hidden group-hover:opacity-100 group-hover:w-auto text-[#b05a55] whitespace-nowrap">
              Sair
            </span>
          </button>
        </div>
      </aside>

      <aside className={`
        h-screen bg-white border-r border-[#e8ede4] flex flex-col transition-all duration-300 overflow-hidden
        ${filteredSubItems.length ? "w-[210px]" : "w-0"}
      `}>
        <div className="h-[82px] flex items-center justify-center border-b border-[#f4f7f2]">
          <span className="text-[11px] font-bold uppercase tracking-[0.20em] text-[#83a678]">
            {activeSectionLabel}
          </span>
        </div>

        <nav className="flex-1 flex flex-col items-center pt-8 gap-3">
          {filteredSubItems.map(({ href, icon: Icon, label }) => {
            const active = href === activeSubHref;
            const isActionItem = href === "/ponto/registrar";

            return (
              <Link
                key={href}
                href={href}
                className={`
                  w-[180px] h-[46px] flex items-center rounded-xl px-4 gap-3 transition-all duration-200
                  ${active ? "bg-[#3a6b35]" : "hover:bg-[#eef3ea]"}
                  ${isActionItem && !active ? "border border-[#3a6b35]/30" : ""}
                `}
              >
                <div className="w-[28px] flex justify-center">
                  <Icon
                    size={17}
                    className={active ? "text-white" : isActionItem ? "text-[#3a6b35]" : "text-[#6a8a60]"}
                  />
                </div>
                <span className={`
                  text-[13px] font-medium
                  ${active ? "text-white" : isActionItem ? "text-[#3a6b35]" : "text-[#374f30]"}
                `}>
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}