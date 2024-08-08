export enum DispenserStatus {
    OPEN = "open",
    CLOSE = "close"
}

export interface Dispenser {
    id: string
    status: DispenserStatus,
    updated_at: string
}

export interface NewDispenser {
    id: string,
    flow_volume: number
}

export interface DispenserDetail {
    amount: number
    usages: DispenserUsage[]
}

export interface DispenserUsage {
    opened_at: string
    closed_at: string
    flow_volume: number
    total_spent: number
}
