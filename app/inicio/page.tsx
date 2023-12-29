'use client'
import OrangeTable from "./components/OrangeTable.component";
import RedTable from "./components/RedTable.component";
import GreenTable from "./components/GreenTable.component";
import Header from "./components/Header.component";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export type TCheckpoints = {
    arrived: boolean,
    arrivalTime: string,
    date: string,
    user: {
        name: string,
        agency: string
        entryTime: string
    }
}


const initialData:TCheckpoints[] = [
    {
        arrived: false,
        arrivalTime: "",
        date: "",
        user: {
            name: "",
            agency: "",
            entryTime: ""
        }
    }
]

export default function Inicio() {
    const [checkpoints, setCheckpoints] = useState<TCheckpoints[]>(initialData)
    const [search, setSearch] = useState("")


    useEffect(() => {
        const getCheckpoints = async () => {
            const checkpoints: AxiosResponse<TCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpoints`)
            return setCheckpoints(checkpoints.data)
        }

   

        getCheckpoints()
 
        
        const intervalId = setInterval(() => {
           getCheckpoints()
      
        }, 5000)
        return () => clearInterval(intervalId);

    }, [])


    return (
        <main className="pb-20">
            <Header />

            <input
                className="mt-20 ml-20 w-[600px] h-10 bg-[#fdd28846] rounded-lg placeholder-[#0b0b0b] font-bold  p-4 "
                type="text"
                placeholder="Buscar"
                color="#FFFFFF"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <div className="px-20 py-3 mt-6 flex justify-between items-center font-bold">
                <h2 className="text-4xl">Status Agências</h2>
                {/*<p className="text-xl">Filtrar</p> */}
            </div>

            <section className="px-20 flex gap-10">
                <GreenTable search={search} checkpoints={checkpoints}/>
                <OrangeTable search={search} checkpoints={checkpoints}/>
                <RedTable search={search} checkpoints={checkpoints}/>
            </section>
        </main>
    )
}