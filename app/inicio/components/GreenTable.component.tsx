import { TVigilant } from "../page"

export default function GreenTable({ vigilantArrived }: TGreenTable) {
    return (
        <div className="max-w-[600px] overflow-x-auto   mt-6 flex flex-col items-center">

            <div className="bg-[#6FAF79] text-xl max-w-[200px] p-2 mb-4 font-bold text-center mx-20 rounded-lg">
                STATUS DE CHEGADA OK
            </div>

            <table className="w-full table-auto ">
                <thead>
                    <tr>
                        <th className=" px-4 py-2">Nome do Vigilante</th>
                        <th className=" px-4 py-2">Horário Chegada</th>
                        <th className=" px-4 py-2">Agência</th>
                        <th className=" px-4 py-2">Status Atual</th>

                    </tr>
                </thead>
                <tbody>

                    {vigilantArrived.map((vigilant: TVigilant) => (
                        <tr key={vigilant.name} className="rounded-2xl bg-slate-600 border-t-[16px] border-[#1D1D1D] text-center">
                            <td className="  px-4 py-2 max-w-[200px] ">{vigilant.name}</td>
                            <td className="px-4 py-2 ">{vigilant.hour}</td>
                            <td className="px-4 py-2 ">{vigilant.agency}</td>
                            <td className="px-4 py-2  justify-center items-center ">
                                <div className="bg-[#76a561] py-2 px-4 rounded-lg font-bold">OK</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

type TGreenTable = {
    vigilantArrived: TVigilant[]
}