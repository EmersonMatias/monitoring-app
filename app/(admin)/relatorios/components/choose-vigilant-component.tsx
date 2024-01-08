import { useGetAllVigilants } from "@/hooks/hooks-vigilants"
import { useState } from "react"
import VigilantReport from "./vigilant-report-component"



export default function ChooseVigilant({ typeReport }: { typeReport: string }) {
    const { data: vigilants } = useGetAllVigilants()
    const [userId, setUserId] = useState<string | undefined>("")
    const [report, setReport] = useState(false)

    function handleClick() {
        setReport(true)
    }


    return (
        <div className={`flex flex-col ${typeReport === "vigilante" ? "" : "hidden"} mt-10`}>

            <div className="flex flex-col px-[400px]">
                <select id="cars" name="cars" className="p-2" onChange={(e) => { setUserId(e.target.value) }} >
                    <option value="0">Escolha um vigilante</option>
                    {
                        vigilants?.map((vigilant) => (
                            <option className="" key={vigilant.id} value={vigilant.id}>{vigilant.name}</option>
                        ))
                    }
                </select>

                <button
                    disabled={report}
                    className="px-8 py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-5 disabled:opacity-50"
                    onClick={() => handleClick()}>
                    Gerar relatório
                </button>
            </div>

            {report && <VigilantReport userId={userId} />}
        </div>
    )
}