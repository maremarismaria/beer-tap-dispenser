"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { closeSession, getSession } from "@/services/session";
import { createDispenser } from "@/services/dispensers";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
      const session = getSession();

      if (!session) {
          router.push("/");
      }
  }, []);

  const onClickLogout = () => {
    closeSession();
    router.push("/");
  };
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const flowVolume = formData.get("flow-volume") as string;
    createDispenser(+flowVolume).then((newDispenser) => {
      console.log(newDispenser);
    });
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
