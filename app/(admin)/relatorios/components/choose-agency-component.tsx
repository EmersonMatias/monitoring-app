import { useGetAllVigilants } from "@/hooks/hooks-vigilants"
import { useState } from "react"
import AgencyReport from "./agency-report-component"

export default function ChooseAgency({ typeReport }: { typeReport: string }) {
    const { data: vigilants } = useGetAllVigilants()
    const [agency, setAgency] = useState<string>()
    const agencies = vigilants?.map((vigilant) => {
        return vigilant.agency
    })
    const agenciesList = agencies?.filter((value, index, self) => self.indexOf(value) === index)
    const [report, setReport] = useState(false)


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
                            <option className="" key={agency} value={agency}>{agency}</option>
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
            {report && <AgencyReport agency={agency} />}

        </div>
    )
}