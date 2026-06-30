import Sidebar from "../components/Sidebar";
import { Heebo } from "next/font/google";

const heebo = Heebo({
  subsets: ["latin"],
});

export default function EhsLayout({ children }) {
  return (
    <div className={`${heebo.className} flex h-screen bg-[#f8faf7] p-4 gap-4`}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#f8faf7] rounded-2xl p-6">
        {children}
      </main>
    </div>
  );
}