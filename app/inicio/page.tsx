'use client'
import OrangeTable from "./components/OrangeTable.component";
import RedTable from "./components/RedTable.component";
import GreenTable from "./components/GreenTable.component";
import Header from "./components/Header.component";
import { useState } from "react";

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

export default function Inicio() {
    const [search, setSearch] = useState("")


    return (
        <main>
            <Header />

            <input
                className="mt-20 ml-20 w-[600px] h-10 bg-stone-400 rounded-lg placeholder-stone-50 font-bold  p-4 "
                type="text"
                placeholder="Buscar"
                color="#FFFFFF"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <div className="px-20 py-3 mt-6 flex justify-between items-center font-bold">
                <h2 className="text-4xl">Status Agências</h2>
                <p className="text-xl">Filtrar</p>
            </div>

            <section className="px-20 flex gap-10">
                <GreenTable search={search} />
                <OrangeTable search={search} />
                <RedTable search={search} />
            </section>
        </main>
    )
}