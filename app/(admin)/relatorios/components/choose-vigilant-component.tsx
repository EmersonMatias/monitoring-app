
import { ChangeEvent, useState } from "react"
import VigilantReport from "./vigilant-report-component"
import { useQueryVigilants } from "@/hooks/hooks-vigilants"

export default function ChooseVigilant() {
    const { data: vigilants } = useQueryVigilants()
    const [userId, setUserId] = useState<string | undefined>("0")
    const [withFilter, setWithFilter] = useState<string>("0")
    const [report, setReport] = useState(false)
    const [firstDate, setFirstDate] = useState("")
    const [endDate, setEndDate] = useState("")

    function handleClick() {
        if (userId === "" || userId === "0") {
            return alert("Selecione um vigilante")
        } else if (withFilter === "0") {
            return alert("Selecione se deseja filtrar por datas")
        }

        setReport(true)
    }

    function handleVigilant(e: ChangeEvent<HTMLSelectElement>) {
        setUserId(e.target.value)

        if (e.target.value === "0") {
            setWithFilter("0")
            setFirstDate("")
            setEndDate("")
        }
    }

    function handleFilter(e: ChangeEvent<HTMLSelectElement>){
        setWithFilter(e.target.value)

        if (e.target.value === "0" || e.target.value === "false") {
            setFirstDate("")
            setEndDate("")
        }
    }

    return (
        <div className={`flex flex-col mt-10`}>

            <div className="flex flex-col items-center ">
                <select id="vigilant" name="vigilant" className="p-2 w-[300px]" onChange={(e) => handleVigilant(e)} >
                    <option value="0">Escolha um vigilante</option>
                    {
                        vigilants?.map((vigilant) => (
                            <option className="" key={vigilant.id} value={vigilant.id}>{vigilant.name}</option>
                        ))
                    }
                </select>

                {userId !== "0" &&
                    <select id="filter" name="filter" className="p-2 mt-10 w-[300px]" onChange={(e) => handleFilter(e)} >
                        <option value="0">Você deseja filtrar por datas:</option>
                        <option className="" value="true">Sim</option>
                        <option className="" value="false">Não</option>
                    </select>
                }

                {(withFilter === "true" && userId !== "0") &&
                    <div className={`flex flex-col`}>
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
                }

                {(withFilter === "true" && userId !== "0" && firstDate !== "" && endDate !== "") &&
                    <button
                        disabled={report}
                        className="px-8 w-[300px] py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-10 disabled:opacity-50"
                        onClick={() => handleClick()}>
                        Gerar relatório
                    </button>
                }

                {(withFilter === "false" && userId !== "0") &&
                    <button
                        disabled={report}
                        className="px-8 w-[300px] py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-10 disabled:opacity-50"
                        onClick={() => handleClick()}>
                        Gerar relatório
                    </button>
                }
            </div>


            {report && <VigilantReport userId={userId} firstDate={firstDate} endDate={endDate} />}
        </div>
    )
}