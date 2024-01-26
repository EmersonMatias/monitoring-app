import { useFindAllVigilants } from "@/hooks/hooks-vigilants"
import { useState } from "react"
import AgencyReport from "./agency-report-component"

export default function ChooseAgency({ typeReport }: { typeReport: string }) {
    const { data: vigilants } = useFindAllVigilants()
    const [agency, setAgency] = useState<string>("0")
    const agencies = vigilants?.map((vigilant) => {
        return vigilant.agency
    })
    const agenciesList = agencies?.filter((value, index, self) => self.indexOf(value) === index)
    const [report, setReport] = useState(false)
    const [withFilter, setWithFilter] = useState<string>("0")
    const [firstDate, setFirstDate] = useState("")
    const [endDate, setEndDate] = useState("")


    function handleClick() {
        setReport(true)

    }

    return (
        <div>
            <div className={`flex flex-col ${typeReport === "agencia" ? "" : "hidden"} mt-10 px-[400px]`}>

                <select id="cars" name="cars" className="p-2" onChange={(e) => { setAgency(e.target.value) }} >
                    <option value="0">Escolha uma agência</option>

                    {
                        agenciesList?.map((agency) => (
                            <option className="" key={agency.id} value={agency.name}>{agency.name}</option>
                        ))
                    }

                </select>

                <select hidden={agency === "0" ? true : false} id="filter" name="filter" className="p-2 mt-10 w-[300px]" onChange={(e) => { setWithFilter(e.target.value) }} >
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
                    hidden={agency === "0" || withFilter === "0" || (withFilter === "true" && (firstDate === "" || endDate === "")) ? true : false}
                    disabled={report}
                    className="px-8 w-[300px] py-2 bg-[#f0a830] rounded-md text-white font-semibold mt-10 disabled:opacity-50"
                    onClick={() => handleClick()}>
                    Gerar relatório
                </button>

            </div>
            {report && <AgencyReport agency={agency} withFilter={withFilter} firstDate={firstDate} endDate={endDate}/>}

        </div>
    )
}