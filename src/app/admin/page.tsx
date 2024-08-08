"use client"
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { closeSession } from "@/services/session";

export default function AdminPage() {
  const router = useRouter();
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const onClickLogout = () => {
    closeSession();
    router.push("/");
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={onClickLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <h1>Admin Page</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="flow-volume">
            <span>Flow volume</span>
            <input type="text" name="flow-volume" id="flow-volume" required/>
        </label>
        <button type="submit">Create dispenser</button>
      </form>
    </>
  );
}
