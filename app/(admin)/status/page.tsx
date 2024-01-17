'use client'
import { useGetAllStatus, useUpdateStatus } from "@/hooks/hooks-status"

export default function Page() {
    const { data: status } = useGetAllStatus()
    const { mutate: updateStatus } = useUpdateStatus()

    function handleOkay(statusID: number) {
        const updateStatusData: TUpdateStatus = {
            newStatus: "OK",
            statusID
        }
        updateStatus(updateStatusData)
    }

    return (
        <div className="flex justify-center">

            <table className="w-1/2 table-auto mt-10">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Horário de Entrada</th>
                        <th className=" px-4 py-2">Horário de Saída</th>
                        <th className=" px-4 py-2">Agência</th>
                        <th className=" px-4 py-2">Status</th>
                        <th className=" px-4 py-2">Último Status</th>
                        <th className=" px-4 py-2">Limpar Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        status?.map((eachStatus) => (
                            <tr key={eachStatus.id} className=" text-center">
                                <td className=" px-4 py-5 max-w-[200px] border-y-slate-300 border-y-2">{eachStatus.user.name}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.entryTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.departureTime}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.user.agency}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{eachStatus.status}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">{`${eachStatus.hour.toString().padStart(2, "0")}:${eachStatus.minute.toString().padStart(2, "0")}`}</td>
                                <td className="px-4 py-5  border-y-slate-300 border-y-2">
                                    {eachStatus.status === "PANIC" ?
                                        <button onClick={() => handleOkay(eachStatus.id)}>
                                            <svg className="w-[40px] h-[40px] text-white dark:text-gray-800" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0 1 24.5 20.58z">
                                                </path>
                                            </svg>
                                        </button> :
                                        null
                                    }
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
