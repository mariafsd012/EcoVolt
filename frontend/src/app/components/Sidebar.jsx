import Link from "next/link";
import Image from "next/image";
import {
  UserRound,
  Clock,
  Users,
  LogOut,
  Home,
  Monitor,
  Truck,
  UserPlus,
  Headphones,
} from "lucide-react";

import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Sidebar() {
  const iconSize = 26;

  const menuItems = [
    { href: "/Usuario", icon: UserRound, label: "Usuário" },
    { href: "/Ponto", icon: Clock, label: "Ponto" },
    { href: "/DHO", icon: Users, label: "DHO" },
    { href: "/Moradia", icon: Home, label: "Moradia" },
    { href: "/TI", icon: Monitor, label: "T.I" },
    { href: "/Logistica", icon: Truck, label: "Logística" },
    { href: "/EHS", icon: UserPlus, label: "EHS" },
    { href: "/Suporte", icon: Headphones, label: "Suporte" },
  ];

  return (
    <aside
      className={`${heebo.className}
        group
        w-[80px]
        hover:w-[240px]
        h-screen
        bg-[#C3D0B7]
        text-[#545B58]
        border-r border-black/10
        shadow-lg
        transition-all duration-300
        flex flex-col
        overflow-hidden
      `}
    >
      {/* LOGO */}
      <div className="h-20 flex items-center px-5 border-b border-black/10 flex-shrink-0">
        <a href="/">
        <div className="flex items-center gap-3">
          {/* ÍCONE */}
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Image
              src="/ecovolt-logo.png"
              alt="EcoVolt"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>

          {/* TEXTO (aparece no hover) */}
          <span
            className="
              font-semibold
              text-lg
              whitespace-nowrap
              opacity-0
              pointer-events-none
              translate-x-[-6px]
              group-hover:opacity-100
              group-hover:pointer-events-auto
              group-hover:translate-x-0
              transition-all
              duration-300
            "
          >
            EcoVolt
          </span>
        </div>
        </a>
      </div>

      {/* MENU */}
      {/* Adicionado as classes 'scrollbar-none' e utilitários para remover a barra visualmente */}
      <nav 
        className="
          flex-1 
          px-3 
          py-5 
          space-y-3 
          overflow-y-auto 
          overflow-x-hidden
          [scrollbar-width:none] 
          [-ms-overflow-style:none] 
          [&::-webkit-scrollbar]:hidden
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                flex items-center
                px-3 py-3
                rounded-xl
                hover:bg-white/60
                hover:text-[#3F4543]
                transition-all duration-200
                w-full
              "
            >
              <div className="w-8 h-8 min-w-[32px] flex items-center justify-center mr-4 flex-shrink-0">
                <Icon size={iconSize} />
              </div>

              <span
                className="
                  whitespace-nowrap
                  opacity-0
                  pointer-events-none
                  group-hover:opacity-100
                  group-hover:pointer-events-auto
                  transition-opacity
                  duration-300
                  font-medium
                "
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-black/10 p-3 flex-shrink-0">
        <button
          className="
            w-full flex items-center
            px-3 py-3
            rounded-xl
            hover:bg-[#D9534F]
            hover:text-white
            transition-all duration-200
          "
        >
          <div className="w-8 h-8 min-w-[32px] flex items-center justify-center mr-4 flex-shrink-0">
            <LogOut size={iconSize} />
          </div>

          <span
            className="
              whitespace-nowrap
              opacity-0
              pointer-events-none
              group-hover:opacity-100
              group-hover:pointer-events-auto
              transition-opacity
              duration-300
              font-medium
            "
          >
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}