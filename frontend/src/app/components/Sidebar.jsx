"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UserRound, Clock, Users, LogOut,
  Home, Monitor, Truck, ShieldCheck, Headphones,
  ClockArrowUp, FileText, Palmtree, BarChart2,
} from "lucide-react";
import { useState } from "react";

const subMenus = {
  "/Ponto": [
    { href: "/Ponto/controle", icon: ClockArrowUp, label: "Controle de Ponto" },
    { href: "/Ponto/justificativas", icon: FileText, label: "Justificativas" },
    { href: "/Ponto/ferias-folgas", icon: Palmtree, label: "Férias e Folgas" },
    { href: "/Ponto/relatorio", icon: BarChart2, label: "Relatório" },
  ],

};

const menuItems = [
  { href: "/Usuario", icon: UserRound, label: "Usuário" },
  { href: "/Ponto", icon: Clock, label: "Ponto" },
  { href: "/DHO", icon: Users, label: "DHO" },
  { href: "/Moradia", icon: Home, label: "Moradia" },
  { href: "/TI", icon: Monitor, label: "T.I" },
  { href: "/Logistica", icon: Truck, label: "Logística" },
  { href: "/EHS", icon: ShieldCheck, label: "EHS" },
  { href: "/Suporte", icon: Headphones, label: "Suporte" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(null);

  const handleItemClick = (href) => {
    if (subMenus[href]) {
      setActiveSection(activeSection === href ? null : href);
    } else {
      setActiveSection(null);
    }
  };

  const subItems = activeSection ? subMenus[activeSection] : [];
  const activeSectionLabel =
    menuItems.find((m) => m.href === activeSection)?.label;

  return (
    <div className="flex h-screen bg-[#f8faf7]">

      {/* ───────── SIDEBAR PRINCIPAL ───────── */}
      <aside className="
        group
        w-[82px] hover:w-[210px]
        h-screen
        bg-white
        border-r border-[#e8ede4]
        shadow-[2px_0_16px_rgba(60,90,50,0.04)]
        transition-all duration-300
        flex flex-col overflow-hidden
        rounded-r-[20px]
      ">

        {/* LOGO */}
        <div className="h-[82px] flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="EcoVolt"
            width={42}
            height={42}
          />
        </div>

        {/* MENU */}
        <nav className="flex-1 flex flex-col gap-1 px-2 py-2">

          {menuItems.map(({ href, icon: Icon, label }) => {
            const active =
              pathname.startsWith(href) || activeSection === href;

            return (
              <button
                key={href}
                onClick={() => handleItemClick(href)}
                className={`
                  w-full h-[48px]
                  flex items-center
                  rounded-xl
                  transition-all duration-200

                  px-0 group-hover:px-[18px]

                  ${active ? "bg-[#3a6b35]" : "hover:bg-[#eef3ea]"}
                `}
              >

                {/* ÍCONE (sempre centralizado na sidebar fechada) */}
                <div className="
                  w-[52px]
                  flex justify-center items-center
                  flex-shrink-0
                ">
                  <Icon
                    size={21}
                    strokeWidth={2.2}
                    className={active ? "text-white" : "text-[#6a8a60]"}
                  />
                </div>

                {/* TEXTO */}
                <span className={`
                  ml-2
                  whitespace-nowrap
                  opacity-0 w-0 overflow-hidden
                  group-hover:opacity-100 group-hover:w-auto
                  transition-all duration-200

                  text-[13.5px] font-medium
                  ${active ? "text-white" : "text-[#374f30]"}
                `}>
                  {label}
                </span>

              </button>
            );
          })}

        </nav>

        {/* BOTTOM */}
        <div className="border-t border-[#f4f7f2] p-2">

          <button className="
            w-full h-[44px]
            flex items-center
            rounded-xl
            px-0 group-hover:px-[18px]
            hover:bg-[#fdecea]
          ">
            <div className="
              w-[52px]
              flex justify-center items-center
            ">
              <LogOut size={21} className="text-[#b05a55]" />
            </div>

            <span className="
              ml-2
              opacity-0 w-0 overflow-hidden
              group-hover:opacity-100 group-hover:w-auto
              text-[#b05a55]
              whitespace-nowrap
            ">
              Sair
            </span>
          </button>

        </div>

      </aside>

      {/* ───────── SUBSIDEBAR ───────── */}
      <aside className={`
        h-screen bg-white
        border-r border-[#e8ede4]
        flex flex-col
        transition-all duration-300
        overflow-hidden
        ${subItems.length ? "w-[210px]" : "w-0"}
      `}>

        {/* HEADER */}
        <div className="
          h-[82px]
          flex items-center justify-center
          border-b border-[#f4f7f2]
        ">
          <span className="
            text-[11px] font-bold uppercase
            tracking-[0.20em]
            text-[#83a678]
          ">
            {activeSectionLabel}
          </span>
        </div>

        {/* MENU */}
        <nav className="flex-1 flex flex-col items-center pt-8 gap-3">

          {subItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  w-[180px] h-[46px]
                  flex items-center
                  rounded-xl
                  px-4
                  gap-3
                  transition-all duration-200

                  ${active ? "bg-[#3a6b35]" : "hover:bg-[#eef3ea]"}
                `}
              >

                <div className="w-[28px] flex justify-center">
                  <Icon
                    size={17}
                    className={active ? "text-white" : "text-[#6a8a60]"}
                  />
                </div>

                <span className={`
                  text-[13px] font-medium
                  ${active ? "text-white" : "text-[#374f30]"}
                `}>
                  {label}
                </span>

              </Link>
            );
          })}

        </nav>

      </aside>

    </div>
  );
}