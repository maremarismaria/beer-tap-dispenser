import Link from "next/link";
import { Dispenser } from "@/types/dispenser";
import styles from "./DispensersTable.module.css";

interface Props {
    dispensers: Dispenser[]
}

export const DispensersTable: React.FC<Props> = ({ dispensers }) => {
    return (
        <table className={styles.dispensersTable}>
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
    )
};
