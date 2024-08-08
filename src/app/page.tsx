import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function BeerDispensersPage() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <main>
        <div className={styles.header}>
          <Image
            src="/beer-32x32.png"
            alt="Beer Image"
            width={32}
            height={32}
          />
          <h1>Beer Dispensers</h1>
        </div>
        <p>There are no dispensers yet</p>
      </main>
    </>
  );
}
