'use client'
import axios, { AxiosResponse } from "axios"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import ChooseVigilant from "./components/choose-vigilant-component"
import ChooseAgency from "./components/choose-agency-component"

type TVigilants2 = {
    agency: string
    departureTime: string
    entryTime: string
    id: number
    name: string
}

type TMessage = {
    id: number,
    date: string,
    hour: string,
    message: string,
    response: string,
    viewed: boolean,
    userId: number
}

type TCheckpoint = {
    id: number,
    date: string,
    arrived: boolean,
    arrivalTime: null,
    userId: number
}

type TVigilantReport = {
    name: string,
    agency: string,
    entryTime: string,
    departureTime: string,
    checkpoint: TCheckpoint[]
    messages: TMessage[]
}

type TAgencyCheckpoints = {
    id: number
    date: string,
    arrived: boolean,
    arrivalTime: string,
    userId: number,
    user: {
        name: string,
        entryTime: string,
        departureTime: string
    }
}

type TAgencyMessages = {
    id: number,
    date: string,
    hour: string,
    message: string,
    response: string,
    viewed: boolean,
    userId: number,
    user: {
        name: string,
        entryTime: string,
        departureTime: string
    }
}




async function handleReportAgency(
    agency: string,
    setAgencyReport: Dispatch<SetStateAction<TVigilantReport[] | undefined>>,
    setAgencyCheckpoints: Dispatch<SetStateAction<TAgencyCheckpoints[]>>,
    setAgencyMessages: Dispatch<SetStateAction<TAgencyMessages[]>>) {

    if (agency === "0" || agency === "") {
        return alert("Selecione uma agência")
    }

    const sucess: AxiosResponse<TVigilantReport[]> = await axios.get(`${process.env.BACKEND_URL}/agency/${agency}`)
    const sucess2: AxiosResponse<TAgencyCheckpoints[]> = await axios.get(`${process.env.BACKEND_URL}/checkpointss/${agency}`)
    const sucess3: AxiosResponse<TAgencyMessages[]> = await axios.get(`${process.env.BACKEND_URL}/messages/${agency}`)


    if (sucess.status === 200) {
        setAgencyReport(sucess.data)
        setAgencyCheckpoints(sucess2.data)
        setAgencyMessages(sucess3.data)
    }
}

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

            {/*escolher o vigilante */}
            <ChooseVigilant typeReport={typeReport} />

            {/*escolher a agencia */}
            <ChooseAgency typeReport={typeReport}/>
        </main >
    )
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
}