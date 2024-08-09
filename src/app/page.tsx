"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dispenser } from "@/types/dispenser";
import { getAllDispensers } from "@/services/dispensers";
import styles from "./page.module.css";

export default function BeerDispensersPage() {
  const [dispensers, setDispensers] = useState<Dispenser[]>([])

  useEffect(()=>{
    getAllDispensers().then(data => {
      setDispensers(data);
    });
  }, []);

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
        <section>
          { dispensers.length 
            ? JSON.stringify(dispensers) 
            : <p>There are no dispensers yet</p>
          }
        </section>
      </main>
    </>
  );
}
