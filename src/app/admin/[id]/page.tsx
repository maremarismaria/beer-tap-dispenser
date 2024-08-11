"use client"
import { Loader } from "@/app/components/Loader";
import { getDispenserDetail } from "@/services/dispensers";
import { DispenserDetail } from "@/types/dispenser";
import { useEffect, useState } from "react";
 
export default function Page({ params }: { params: { id: string } }) {
    const [dispenser, setDispenser] = useState({} as DispenserDetail);

    useEffect(() => {
        getDispenserDetail(params.id).then(dispenser => {
            setDispenser(dispenser as DispenserDetail);
        });
    }, []);

    return Object.entries(dispenser).length
        ? <p>Dispenser: {JSON.stringify(dispenser)}</p> 
        : <Loader/>
}
