"use client"
import { Loader } from "@/app/components/Loader";
import { getDispenserDetail } from "@/services/dispensers";
import { DispenserDetail } from "@/types/dispenser";
import { useEffect, useState } from "react";
import { getSession } from "@/services/session";
import { useRouter } from "next/navigation";
import { DispenserDetailTable } from "@/app/components/DispenserDetailTable/DispenserDetailTable";
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
                    <DispenserDetailTable dispenser={dispenser}/>
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
