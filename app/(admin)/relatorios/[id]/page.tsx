'use client'
import { useEffect, useRef, useState } from "react"
import { useReactToPrint } from "react-to-print"
import { useFindUniqueVigilantFilter } from "@/hooks/hooks-vigilants"
import queryString from "query-string"
import {  convertTimeToBrasilia, formatDateToBR } from "@/functions/functions"

export default function VigilantReport({ params: { id } }: { readonly params: { id: string } }) {
    const [initialDate, setInitialDate] = useState('')
    const [finalDate, setFinalDate] = useState('')
    const { data: vigilant, isSuccess, isPending } = useFindUniqueVigilantFilter(id, initialDate, finalDate)
    const contentDocument = useRef(null)
    
    useEffect(() => {
        const queryParams = queryString.parse(window.location.search) as { initialDate: string, finalDate: string }

        setInitialDate(queryParams.initialDate)

        setFinalDate(queryParams.finalDate)
    }, []);

    const handlePrint = useReactToPrint({
        content: () => contentDocument?.current,
    })

    return (
        <div className="flex flex-col items-center my-20">
            <button className="p-2 bg-red-400 text-white font-bold rounded-md flex items-center gap-2" onClick={handlePrint}>
                Baixar relatório
                <svg className="w-[30px] h-[30px]" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V304H176c-35.3 0-64 28.7-64 64V512H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM176 352h32c30.9 0 56 25.1 56 56s-25.1 56-56 56H192v32c0 8.8-7.2 16-16 16s-16-7.2-16-16V448 368c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24H192v48h16zm96-80h32c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H304c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H320v96h16zm80-112c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v32h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H448v48c0 8.8-7.2 16-16 16s-16-7.2-16-16V432 368z"></path>
                </svg>
            </button>
            {isPending &&
                <p className="mt-20 text-3xl text-gray-700">Gerando relatório...</p>
            }
            {(isSuccess && !isPending) &&
                <div ref={contentDocument} className={`bg-white mt-20 flex flex-col items-center pb-10 pt-10 border-[2px] rounded-2xl`} >
                    <p>Vigilante: {vigilant?.name} </p>
                    <p>Agência: {vigilant?.agency.name}</p>
                    <p>Horário de Entrada: {convertTimeToBrasilia(vigilant?.entryTime)}</p>
                    <p>Horário de Saída: {convertTimeToBrasilia(vigilant?.departureTime)}</p>

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
                            {vigilant?.checkpoint?.map((checkpoints) => (
                                <tr key={checkpoints.id}>
                                    <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{formatDateToBR(checkpoints.date)}</td>
                                    <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {convertTimeToBrasilia(vigilant?.entryTime)}</td>
                                    <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {convertTimeToBrasilia(vigilant?.departureTime)}</td>
                                    <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrivalTime && convertTimeToBrasilia(checkpoints?.arrivalTime)}</td>
                                    <td className="  px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2"> {checkpoints?.arrived === true ? "Sim" : "Não"}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <h3 className="text-3xl font-bold mt-10">Mensagens:</h3>
                    {vigilant?.messages?.map((message) => (
                        <div key={message.id} className="w-[800px] text-left flex flex-col gap-2 pl-10 mt-4 p-4 bg-[#ECECEC] rounded-md">
                            <p><span className="font-bold">Vigilante:</span> {vigilant.name}</p>

                            <p><span className="font-bold">Agência:</span> {vigilant.agency.name}</p>

                            <p><span className="font-bold">Dia: </span>{formatDateToBR(message.dateTime)}</p>

                            <p><span className="font-bold">Horário: </span>{convertTimeToBrasilia(message.dateTime)}</p>

                            <p><span className="font-bold">Mensagem:</span> {message?.message}</p>

                            {message?.viewed ?
                                <p><span className="font-bold">Tratamento da mensagem:</span> <span className="">{message.response}</span></p> :
                                <p>Mensagem não visualizada.</p>
                            }

                        </div>
                    ))}

                </div>
            }
        </div>
    )
}



interface QueryParams {
    initialData: string,
    finalData: string
}