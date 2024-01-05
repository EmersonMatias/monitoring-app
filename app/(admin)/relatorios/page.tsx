'use client'

import axios, { AxiosResponse } from "axios"
import { Dispatch, FormEvent, MouseEvent, SetStateAction, useEffect, useState } from "react"

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


async function hadleReport(
    userId: string,
    setVigilant: Dispatch<SetStateAction<TVigilantReport | undefined>>) {

    if (userId === "0" || userId === "") {
        return alert("Selecione um vigilante")
    }

    const sucess: AxiosResponse<TVigilantReport> = await axios.get(`${process.env.BACKEND_URL}/vigilants/${userId}`)
    if (sucess.status === 200) {
        setVigilant(sucess.data)
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
    const [userId, setUserId] = useState("")
    const [agency, setAgency] = useState("")
    const [vigilants, setVigilants] = useState<TVigilants2[]>([])
    const [vigilant, setVigilant] = useState<TVigilantReport>()
    const [agencyReport, setAgencyReport] = useState<TVigilantReport[]>()
    const agencies = vigilants.map((vigilant) => {
        return vigilant.agency
    })
    const agenciesList = agencies?.filter((value, index, self) => self.indexOf(value) === index)

    const [typeReport, setTypeReport] = useState("")
    const [agencyCheckpoints, setAgencyCheckpoints] = useState<TAgencyCheckpoints[]>([])
    const [agencyMessages, setAgencyMessages] = useState<TAgencyMessages[]>([])

    console.log(agencyMessages)

    useEffect(() => {
        const getVigilants = async () => {
            const vigilantsList: AxiosResponse<TVigilants2[]> = await axios.get(`${process.env.BACKEND_URL}/vigilants`)
            if (vigilantsList.status === 200) {
                setVigilants(vigilantsList.data)
            }
        }
        getVigilants()

    }, [])


    return (
        <main className="flex flex-col items-center pb-20 mt-6">

            <h2 className='text-3xl text-center mb-10 font-bold text-[#0B0B0B]'>Relatórios</h2>


            <div className="flex flex-col">
                <select className="p-2" onChange={(e) => { setTypeReport(e.target.value) }} >
                    <option value="0">Escolha uma opção de relatório</option>
                    <option value="agencia" >Agência</option>
                    <option value="vigilante" >Vigilante</option>
                </select>
            </div>


            <div className={`flex flex-col ${typeReport === "vigilante" ? "" : "hidden"} mt-10`}>

                <select id="cars" name="cars" className="p-2" onChange={(e) => { setUserId(e.target.value) }} >
                    <option value="0">Escolha um vigilante</option>

                    {
                        vigilants?.map((vigilant) => (
                            <option className="" key={vigilant.id} value={vigilant.id}>{vigilant.name}</option>
                        ))
                    }

                </select>

                <button
                    className="px-8 py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-5"
                    onClick={() => hadleReport(userId, setVigilant)}>
                    Gerar relatório
                </button>

            </div>

            <div className={`flex flex-col ${typeReport === "agencia" ? "" : "hidden"} mt-10`}>

                <select id="cars" name="cars" className="p-2" onChange={(e) => { setAgency(e.target.value) }} >
                    <option value="0">Escolha uma agência</option>

                    {
                        agenciesList?.map((agency) => (
                            <option className="" key={agency} value={agency}>{agency}</option>
                        ))
                    }

                </select>

                <button
                    className="px-8 py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-5"
                    onClick={() => handleReportAgency(agency, setAgencyReport, setAgencyCheckpoints, setAgencyMessages)}>
                    Gerar relatório
                </button>

            </div>

            <div className={`bg-white w-1/2 mt-20 flex flex-col items-center pb-10 pt-10 border-[2px] rounded-2xl ${vigilant !== undefined && typeReport === "vigilante" ? "" : "hidden"}`} >
                <p>Vigilante: {vigilant?.name} </p>
                <p>Agência: {vigilant?.agency}</p>
                <p>Horário de Entrada: {vigilant?.entryTime}</p>
                <p>Horário de Saída: {vigilant?.departureTime}</p>

                <h3 className="text-3xl font-bold mt-20">Checkpoints</h3>
                <table className="w-1/2 table-auto mb-20 text-center">
                    <thead>
                        <tr>
                            <th className=" px-4 py-2">Dia</th>
                            <th className=" px-4 py-2">Horário de Entrada</th>
                            <th className=" px-4 py-2">Horário de Saída</th>
                            <th className=" px-4 py-2">Horário do Checkpoint</th>
                            <th className=" px-4 py-2">Checkpoint Realizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vigilant?.checkpoint.map((checkpoints) => (
                            <tr key={checkpoints.id}>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{checkpoints.date}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {vigilant?.entryTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {vigilant?.departureTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrivalTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrived === true ? "Sim" : "Não"}</td>

                            </tr>
                        ))}



                    </tbody>
                </table>

                <h3 className="text-3xl font-bold mt-10">Mensagens:</h3>
                {vigilant?.messages?.map((message) => (
                    <div key={message.id} className="w-[800px] text-left flex flex-col gap-2 pl-10 mt-4 p-4 bg-[#ECECEC] rounded-md">
                        <p><span className="font-bold">Vigilante:</span> {vigilant.name}</p>

                        <p><span className="font-bold">Agência:</span> {vigilant.agency}</p>

                        <p><span className="font-bold">Dia:</span> {message?.date}</p>

                        <p><span className="font-bold">Horário:</span> {message?.hour}</p>

                        <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                        {message?.viewed ?
                            <p><span className="font-bold">Tratamento da mensagem:</span> <span className="">{message.response}</span></p> :
                            <p>Mensagem não visualizada.</p>
                        }


                    </div>
                ))}

            </div>

            {/*Agency Report*/}
            <div className={`bg-white w-1/2 mt-20 flex flex-col items-center pb-10 pt-10 border-[2px] rounded-2xl ${agencyReport !== undefined  && typeReport === "agencia" ? "" : "hidden"}`} >
                <p>Agência: {agency} </p>


                <h3 className="text-3xl font-bold mt-20">Checkpoints</h3>
                <table className="w-1/2 table-auto mb-20 text-center">
                    <thead>
                        <tr>
                            <th className=" px-4 py-2">Nome</th>
                            <th className=" px-4 py-2">Dia</th>
                            <th className=" px-4 py-2">Horário de Entrada</th>
                            <th className=" px-4 py-2">Horário de Saída</th>
                            <th className=" px-4 py-2">Horário do Checkpoint</th>
                            <th className=" px-4 py-2">Checkpoint Realizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencyCheckpoints?.map((checkpoints) => (
                            <tr key={checkpoints.id}>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{checkpoints.user.name}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{checkpoints.date}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.user?.entryTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.user?.departureTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrivalTime}</td>
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrived === true ? "Sim" : "Não"}</td>

                            </tr>
                        ))}



                    </tbody>
                </table>

                <h3 className="text-3xl font-bold mt-10">Mensagens:</h3>
                {agencyMessages?.map((message) => (
                    <div key={message.id} className="w-[800px] text-left flex flex-col gap-2 pl-10 mt-4 p-4 bg-[#ECECEC] rounded-md">
                        <p><span className="font-bold">Vigilante:</span> {message.user.name}</p>

                        <p><span className="font-bold">Dia:</span> {message?.date}</p>

                        <p><span className="font-bold">Horário:</span> {message?.hour}</p>

                        <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                        {message?.viewed ?
                            <p><span className="font-bold">Tratamento da mensagem:</span> <span className="">{message.response}</span></p> :
                            <p>Mensagem não visualizada.</p>
                        }


                    </div>
                ))}

            </div>


        </main>
    )
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
}