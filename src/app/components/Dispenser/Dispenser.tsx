import Image from "next/image";
import { MouseEventHandler } from "react";
import { Dispenser as IDispenser, DispenserStatus } from "@/types/dispenser";
import styles from "./Dispenser.module.css";

interface Props {
    dispenser: IDispenser
    onClickDispenserStatus: MouseEventHandler<HTMLElement>
}

export const Dispenser: React.FC<Props> = ({ dispenser, onClickDispenserStatus }) => {
    const buttonText = DispenserStatus.OPEN === dispenser.status 
        ? "Close" 
        : "Open";

    return (
        <div className={styles.Dispenser}>
            <Image
                src="/beer-32x32.png"
                alt="Beer Image"
                width={32}
                height={32}
            />
            <button className={styles.button} onClick={onClickDispenserStatus}>
                { buttonText }
            </button>
        </div>
    )
}
