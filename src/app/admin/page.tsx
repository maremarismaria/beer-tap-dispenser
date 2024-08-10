"use client"
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { closeSession, getSession } from "@/services/session";
import { createDispenser, getAllDispensers } from "@/services/dispensers";
import { Dispenser } from "@/types/dispenser";
import { Loader } from "../components/Loader";
import { DispenserList } from "../components/DispenserList/DispenserList";

export default function AdminPage() {
  const router = useRouter();
  const [dispensers, setDispensers] = useState<Dispenser[]>([]);

  useEffect(()=>{
    getAllDispensers().then(data => {
      setDispensers(data);
    });
  }, []);

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

  const onClickDispenserStatus = (dispenser: Dispenser) => () => {
    console.log(dispenser);
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <button onClick={onClickLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <h1>Admin Section</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="flow-volume">
            <span>Flow volume</span>
            <input type="text" name="flow-volume" id="flow-volume" placeholder="0.63" required/>
        </label>
        <button type="submit">Create dispenser</button>
      </form>
      <section>
        { dispensers.length 
            ? <DispenserList 
                dispensers={dispensers} 
                onClickDispenserStatus={onClickDispenserStatus} />
            : <Loader/>
        }
      </section>
    </>
  );
}
