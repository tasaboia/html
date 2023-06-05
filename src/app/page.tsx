import Image from "next/image";
import styles from "./page.module.css";
import GetHtml from "@/components/GetHtml";

export default function Home() {
  return (
    <main className={styles.main}>
      <GetHtml />
    </main>
  );
}
