import { useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { formatarDataParaPTBR } from "../../estatistica/page"

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

export default function VigilantReport({ userId }: { userId: string | undefined }) {
    const { data: vigilant } = useQuery({
        queryKey: ["datavigilant"],
        queryFn: async () => {
            const data: AxiosResponse<TVigilantReport> = await axios.get(`${process.env.BACKEND_URL}/vigilants/${userId}`)
            return data.data
        },
        enabled: (userId === undefined || userId.length === 0) ? false : true
    })
    const contentDocument = useRef()

    const handlePrint = useReactToPrint({
        content: () => contentDocument?.current
    })
  

    return (
        <>
            <button onClick={handlePrint}>
                Gerar relatório
            </button>
            <div ref={contentDocument} className={`bg-white mt-20 flex flex-col items-center pb-10 pt-10 border-[2px] rounded-2xl`} >
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
                                <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{(checkpoints.date)}</td>
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

                        <p><span className="font-bold">Dia:</span> {(message?.date)}</p>

                        <p><span className="font-bold">Horário:</span> {message?.hour}</p>

                        <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                        {message?.viewed ?
                            <p><span className="font-bold">Tratamento da mensagem:</span> <span className="">{message.response}</span></p> :
                            <p>Mensagem não visualizada.</p>
                        }

                    </div>
                ))}

            </div>
        </>
    )
}