"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { closeSession, getSession } from "@/services/session";
import { createDispenser, getAllDispensers } from "@/services/dispensers";
import { Dispenser, DispenserStatus } from "@/types/dispenser";
import { Loader } from "../components/Loader";
import styles from "./page.module.css";

export default function AdminPage() {
  const router = useRouter();
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);

  useEffect(()=>{
    getAllDispensers().then(data => {
      setDispensers(data);
    });
  }, []);

  useEffect(() => {
      const session = getSession();

      if (!session) {
          router.push("/");
      }
  }, []);

  const onClickLogout = () => {
    closeSession();
    router.push("/");
  };
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const flowVolume = formData.get("flow-volume") as string;
    createDispenser(+flowVolume).then((newDispenser) => {
      const dispensersList = structuredClone(dispensers);
      const updated_at = (new Date()).toISOString();
      const dispenser = { ...newDispenser, updated_at, status: DispenserStatus.CLOSE };
      setDispensers([...dispensersList, dispenser]);
    });
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li>
            <button onClick={onClickLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <header className={styles.header}>
        <h1>Beer Dispensers</h1>
      </header>
      <main>
        <section>
          <form className={styles.flowVolumeForm} onSubmit={onSubmit}>
            <label htmlFor="flow-volume">
                <span>Flow volume</span>
                <input type="text" name="flow-volume" id="flow-volume" placeholder="0.63" required/>
            </label>
            <button type="submit">Create dispenser</button>
          </form>
        </section>
        <section className={styles.dispensersListSection}>
          { dispensers.length 
              ? <table className={styles.dispensersTable}>
                  <thead>
                    <tr>
                      <th>Dispenser ID</th>
                      <th>Status</th>
                      <th>Updated At</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dispensers.map(({ id, status, updated_at }) => {
                        return (
                          <tr key={id}>
                            <td>{id}</td>
                            <td>{status}</td>
                            <td>{updated_at}</td>
                            <td>
                              <Link href={`/admin/${id}`}>Detail</Link>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              : <Loader/>
          }
        </section>
      </main>
    </>
  );
}
