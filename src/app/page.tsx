"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dispenser, DispenserStatus } from "@/types/dispenser";
import { getAllDispensers, updateDispenser } from "@/services/dispensers";
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
    const status = DispenserStatus.OPEN === dispenser.status 
      ? DispenserStatus.CLOSE 
      : DispenserStatus.OPEN;
    const updated_at = (new Date()).toISOString();
    
    updateDispenser({ id: dispenser.id, status, updated_at })
      .then(() => {
        const dispensersList = structuredClone(dispensers);
        const dispenserPosition = dispensersList.findIndex(({ id }) => id === dispenser.id);
        dispensersList[dispenserPosition] = { ...dispensersList[dispenserPosition], status };
        setDispensers(dispensersList);
      });
  };

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
