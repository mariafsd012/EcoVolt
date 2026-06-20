import styles from "./layout.module.css";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}