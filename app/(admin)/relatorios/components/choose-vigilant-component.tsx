
import { useFindManyVigilants } from "@/hooks/hooks-vigilants"
import { useForm } from "react-hook-form"
import InputFormWhite from "@/components/InputFormWhite"
import { useRouter } from "next/navigation"

export default function ChooseVigilant() {
    const { data: vigilants } = useFindManyVigilants()
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<VigilantReportForm>()
    const router = useRouter()

    function onSubmitGenerateReport(data: VigilantReportForm) {
        const initialDate = data.initialDate ? new Date(data.initialDate).toISOString() : ''
        const finalDate = data.finalDate ? new Date(data.finalDate).toISOString() : ''

        if (data.filterByDate === "true") {
            router.push(`/relatorios/vigilante/${data.vigilant}?initialDate=${initialDate}&finalDate=${finalDate}`)
            reset()
        } else {
            router.push(`/relatorios/vigilante/${data.vigilant}`)
            reset()
        }
        console.log(initialDate, finalDate, data.filterByDate)
    }
    
    return (
        <div className={`flex flex-col mt-10`}>

            <form className="flex flex-col" onSubmit={handleSubmit((data) => onSubmitGenerateReport(data))}>

                <select
                    {...register("vigilant", {
                        required: "Escolha uma opção"
                    })}
                    className="pl-4 py-2 bg-[#ffffff] rounded-xl mb-2 disabled:opacity-50 mt2 w-[500px]">

                    <option value="">Escolha um vigilante</option>
                    {vigilants?.map((vigilant) => {
                        return <option key={vigilant.id} value={vigilant.id}>{vigilant.name}</option>

                    })}
                </select>
                {errors.vigilant && <p className="pl-2 font-bold text-red-600">{errors.vigilant.message}</p>}


                <select
                    {...register("filterByDate", {
                        required: "Escolha uma opção"
                    })}
                    className="pl-4 py-2 bg-[#ffffff] rounded-xl mb-2 disabled:opacity-50 mt2 w-[500px]">

                    <option value="">Escolha uma opção</option>

                    <option value="true">Sim</option>
                    <option value="false">Não</option>

                </select>
                {errors.filterByDate && <p className="pl-2 font-bold text-red-600">{errors.filterByDate.message}</p>}

                {(watch('filterByDate') === 'true') && <InputFormWhite
                    id="initialDate"
                    name="initialDate"
                    type="date"
                    label="Escolha a data inicial"
                    required="Você deve selecionar uma data inicial"
                    register={register}
                    message={errors?.initialDate?.message}
                //isPending={isPending}
                />}

                {(watch('filterByDate') === 'true') && <InputFormWhite
                    id="finalDate"
                    name="finalDate"
                    type="date"
                    label="Escolha a data final"
                    required="Você deve selecionar uma data final"
                    register={register}
                    message={errors?.finalDate?.message}
                //isPending={isPending}
                />
                }


                <button>Gerar relatório</button>
            </form>

        </div>
    )
}

type VigilantReportForm = {
    vigilant: string
    filterByDate: string
    initialDate?: string
    finalDate?: string
}