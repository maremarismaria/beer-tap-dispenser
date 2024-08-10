"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dispenser } from "@/types/dispenser";
import { getAllDispensers } from "@/services/dispensers";
import { Loader } from "./components/Loader";
import { DispenserList } from "./components/DispenserList/DispenserList";
import styles from "./page.module.css";

export default function BeerDispensersPage() {
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);

  useEffect(()=>{
    getAllDispensers().then(data => {
      setDispensers(data);
    });
  }, []);

  const onClickDispenserStatus = (dispenser: Dispenser) => () => {
    console.log(dispenser);
  }

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <header className={styles.header}>
        <h1>Beer Dispensers</h1>
      </header>
      <main className={styles.main}>
        { dispensers.length 
            ? <DispenserList 
                dispensers={dispensers} 
                onClickDispenserStatus={onClickDispenserStatus} />
            : <Loader/>
        }
      </main>
    </>
  );
}
