import { MouseEventHandler } from "react";
import { Dispenser as IDispenser} from "@/types/dispenser";
import styles from "./DispenserList.module.css";
import { Dispenser } from "../Dispenser/Dispenser";

interface Props {
    dispensers: IDispenser[]
    onClickDispenserStatus: (dispenser: IDispenser) => MouseEventHandler<HTMLElement>
}

export const DispenserList: React.FC<Props> = ({ dispensers, onClickDispenserStatus }) => {
    return (
        <ul className={styles.dispensersList}>
            {
                dispensers.map(dispenser => 
                    <li key={dispenser.id}>
                        <Dispenser 
                            dispenser={dispenser} 
                            onClickDispenserStatus={onClickDispenserStatus(dispenser)}
                        />
                    </li>
                )
            }
        </ul>
    )
}
