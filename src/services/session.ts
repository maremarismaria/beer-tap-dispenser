import { STORAGE_KEY } from "@/constants";
import { User } from "@/types/user";

export interface Session {
    username: string
    isAuthenticated: boolean
}

export const getSession: () => Session = () => {
    const session = sessionStorage.getItem(STORAGE_KEY)
    return !!session ? JSON.parse(session) : null
};

export const setSession: (user: User) => void = ({ username }) => {
    const session: Session = { username, isAuthenticated: true };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const closeSession: () => void = () => {
    sessionStorage.removeItem(STORAGE_KEY)
};
