import { DispenserDetail } from "@/types/dispenser";
import styles from "./DispenserDetailTable.module.css";

interface Props {
    dispenser: DispenserDetail
}

export const DispenserDetailTable: React.FC<Props> = ({ dispenser }) => {
    return (
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
    )
};
