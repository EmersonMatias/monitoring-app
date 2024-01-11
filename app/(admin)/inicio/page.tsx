'use client'
import OrangeTable from "./components/OrangeTable.component";
import RedTable from "./components/RedTable.component";
import GreenTable from "./components/GreenTable.component";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

export default function Inicio() {
    const [search, setSearch] = useState("")
    const router = useRouter()
    const token = Cookies.get("token")  

    useEffect(() => {

        if (token === undefined) {
            return router.push("/")
        }

    }, [router, token])


    return (
        <main className="pb-20">
            <input
                className="mt-20 ml-20 w-[600px] h-10 bg-white rounded-lg font-bold  p-4 "
                type="text"
                placeholder="Buscar"
                color="#FFFFFF"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <div className="px-20 py-3 mt-6 flex justify-between items-center font-bold">
                <h2 className="text-3xl">Status Agências</h2>
            </div>

            <section className="px-20 flex gap-10">
                <GreenTable search={search}  />
                <OrangeTable search={search}  />
                <RedTable search={search}/>
            </section>
        </main>
    )
}