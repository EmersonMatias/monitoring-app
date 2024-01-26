
import { useState } from "react"
import VigilantReport from "./vigilant-report-component"
import { useFindAllVigilants } from "@/hooks/hooks-vigilants"



export default function ChooseVigilant({ typeReport }: { typeReport: string }) {
    const { data: vigilants } = useFindAllVigilants()
    const [userId, setUserId] = useState<string | undefined>("0")
    const [withFilter, setWithFilter] = useState<string>("0")
    const [report, setReport] = useState(false)
    const [firstDate, setFirstDate] = useState("")
    const [endDate, setEndDate] = useState("")

    console.log(firstDate.split("-"), endDate.split("-"))

    function handleClick() {
        if (userId === "" || userId === "0") {
            return alert("Selecione um vigilante")
        } else if (withFilter === "0") {
            return alert("Selecione se deseja filtrar por datas")
        }

        setReport(true)
    }


    return (
        <div className={`flex flex-col ${typeReport === "vigilante" ? "" : "hidden"} mt-10`}>



            <div className="flex flex-col items-center ">
                <select id="cars" name="cars" className="p-2 w-[300px]" onChange={(e) => { setUserId(e.target.value) }} >
                    <option value="0">Escolha um vigilante</option>
                    {
                        vigilants?.map((vigilant) => (
                            <option className="" key={vigilant.id} value={vigilant.id}>{vigilant.name}</option>
                        ))
                    }
                </select>

                <select hidden={userId === "0" ? true : false} id="filter" name="filter" className="p-2 mt-10 w-[300px]" onChange={(e) => { setWithFilter(e.target.value) }} >
                    <option value="0">Você deseja filtrar por datas:</option>
                    <option className="" value="true">Sim</option>
                    <option className="" value="false">Não</option>
                </select>

                <div className={`flex flex-col ${withFilter !== "0" && withFilter === "true" ? null : "hidden"}`}>
                    <label htmlFor="firstDate" className="mt-10 font-bold ml-2">Selecione a data de inicio.</label>
                    <input
                        id="firstDate"
                        className="mt-2 w-[300px] h-10 bg-white rounded-lg font-bold  p-4"
                        type="date"
                        onChange={(e) => setFirstDate(e.target.value)}
                    />

                    <label htmlFor="endDate" className="mt-10 font-bold ml-2">Selecione a data final.</label>
                    <input
                        id="endDate"
                        className="mt-2  w-[300px] h-10 bg-white rounded-lg font-bold  p-4"
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                    />

                </div>


                <button
                    hidden={userId === "0" || withFilter === "0" || (withFilter === "true" && (firstDate === "" || endDate === "")) ? true : false}
                    disabled={report}
                    className="px-8 w-[300px] py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-10 disabled:opacity-50"
                    onClick={() => handleClick()}>
                    Gerar relatório
                </button>
            </div>


            {report && <VigilantReport userId={userId} withFilter={withFilter} firstDate={firstDate} endDate={endDate} />}
        </div>
    )
}