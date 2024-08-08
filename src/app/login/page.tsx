"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { setSession, getSession } from "@/services/session";
import { ADMIN_USER } from "@/constants";
import { User } from "@/types/user";
import styles from "@/app/login/login.module.css";

export default function LoginPage() {
    const router = useRouter();
    const [ error, setError ] = useState('');

    useEffect(() => {
        const session = getSession();

        if (session && session.isAuthenticated) {
            router.push("admin");
        }
    }, []);

    const validateForm = ({ username, password }: User) => {
        const isAdmin = ADMIN_USER.username === username 
            && ADMIN_USER.password === password;

        if (isAdmin) {
            setSession({ username, password });
            router.push("admin");
        } else {
            setError('Incorrect username or password');
        }
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        validateForm({ username, password });
    };

    return (
        <form className={styles.loginForm} onSubmit={onSubmit}>
            <label htmlFor="username">
                <span>Username</span>
                <input type="text" name="username" id="username" required/>
            </label>
            <label htmlFor="password">
                <span>Password</span>
                <input type="password" name="password" id="password" required/>
            </label>
            <p className={styles.error}>{ error }</p>
            <button type="submit">Login</button>
        </form>
    );
}
