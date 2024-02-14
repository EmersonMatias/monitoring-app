'use client'
import { useState } from "react"
import ChooseVigilant from "./components/choose-vigilant-component"
import ChooseAgency from "./components/choose-agency-component"

export default function Relatorios() {
    const [typeReport, setTypeReport] = useState("")

    return (
        <main className="flex flex-col items-center pb-20 mt-6">

            <h2 className='text-3xl text-center mb-10 font-bold text-[#0B0B0B]'>Relatórios</h2>


            <div className="flex flex-col">
                <select className="p-2 w-[300px]" onChange={(e) => { setTypeReport(e.target.value) }} >
                    <option value="0">Escolha uma opção de relatório</option>
                    <option value="agencia" >Agência</option>
                    <option value="vigilante" >Vigilante</option>
                </select>
            </div>

           {typeReport === "vigilante" && <ChooseVigilant/>}

           {typeReport === "agencia" && <ChooseAgency  />}
        </main >
    )
}
