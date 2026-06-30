import styles from "../../dashboard/layout.module.css";
import Sidebar from "../../components/Sidebar";

export default function LogisticaLayout({ children }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}