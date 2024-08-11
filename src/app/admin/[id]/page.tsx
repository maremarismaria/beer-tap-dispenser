"use client"
import { Loader } from "@/app/components/Loader";
import { getDispenserDetail } from "@/services/dispensers";
import { DispenserDetail } from "@/types/dispenser";
import { useEffect, useState } from "react";
import { getSession } from "@/services/session";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
 
export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [dispenser, setDispenser] = useState({} as DispenserDetail);

    useEffect(() => {
        const session = getSession();
  
        if (!session) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        getDispenserDetail(params.id).then(dispenser => {
            setDispenser(dispenser as DispenserDetail);
        });
    }, []);

    const renderDispenserDetail = (dispenser: DispenserDetail) => {
        return (
            <>
                <div className={styles.dispenserDetailAmountContainer}>
                    <p>Amount: {dispenser.amount}</p>
                </div>
                <div className={styles.dispenserDetailTableContainer}>
                    <table className={styles.dispenserDetailTable}>
                        <caption>Usages</caption>
                        <thead>
                            <tr>
                                <th>Opened At</th>
                                <th>Closed At</th>
                                <th>Flow Volume</th>
                                <th>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dispenser && dispenser.usages && dispenser.usages.map(({ opened_at, closed_at, flow_volume, total_spent }) => {
                                    return (
                                    <tr key={opened_at}>
                                        <td>{opened_at}</td>
                                        <td>{closed_at}</td>
                                        <td>{flow_volume}</td>
                                        <td>{total_spent}</td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    return (
        <>
            <header className={styles.header}>
                <h1>Dispenser Details</h1>
            </header>
            <section className={styles.dispenserDetailSection}>
                {
                    Object.entries(dispenser).length
                        ? renderDispenserDetail(dispenser)
                        : <Loader/>
                }
            </section> 
        </>
    )
}
