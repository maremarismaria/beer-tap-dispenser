import { API_URL } from "@/constants";
import { Dispenser, DispenserDetail, NewDispenser } from "@/types/dispenser";

export const getAllDispensers: () => Promise<Dispenser[]> = () => {
    const requestParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return fetch(`${API_URL}/api/dispenser`, requestParams)
        .then(data => data.json());
}

export const getDispenserDetail: (id: string) => Promise<DispenserDetail[]> = (id) => {
    const requestParams = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return fetch(`${API_URL}/api/dispenser/${id}`, requestParams)
        .then(data => data.json());
}

export const createDispenser: (flow_volume: number) => Promise<NewDispenser> = (flow_volume) => {
    const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flow_volume }),
    };

    return fetch(`${API_URL}/api/dispenser`, requestParams)
        .then(data => data.json());
}

export const updateDispenser: (dispenser: Dispenser) => Promise<void> = (dispenser) => {
    const { id, status, updated_at } = dispenser;
    const requestParams = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, updated_at })
    };

    return fetch(`${API_URL}/api/dispenser/${id}`, requestParams)
        .then(data => data.json());
}
