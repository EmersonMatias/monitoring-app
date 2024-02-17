'use client'
import ButtonForm from "@/components/ButtonForm"
import InputOrange from "@/components/InputOrange.component"
import { useUpdateContingency, useFindUniqueContingency } from "@/hooks/hooks-contingency"
import { useEffect } from "react"
import { useForm } from "react-hook-form"


export default function CreateContingency({ params }: { readonly params: { id: string } }) {
    const userId = Number(params.id)
    const { data: contingency, isSuccess } = useFindUniqueContingency(userId)
    const { register, handleSubmit, setValue } = useForm<{ frequency: number }>()

    const { mutate: updateContingency, isPending } = useUpdateContingency()

    useEffect(() => {
        if (isSuccess) {
            setValue("frequency", contingency?.frequency)
        }

    }, [isSuccess, setValue, contingency])


    function onSubmitActiveContingency(data: { frequency: number }) {
        const frequency = Number(data.frequency)
        const active = true
        const situation = "OK"
        updateContingency({ userId, active, situation, frequency })
    }

    function onSubmitDeactivateContingency() {
        const active = false
        const situation = "OK"
        updateContingency({ userId, active, situation })
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {isSuccess && <h2 className="mt-10">Vigilante: {contingency?.user?.name}</h2>}

            {(isSuccess && !contingency.active) &&
                <div className="bg-white w-[400px]  mt-10 rounded-md p-5 flex flex-col items-center ">
                    <form onSubmit={handleSubmit(onSubmitActiveContingency)} className="flex flex-col items-center">
                        <InputOrange
                            id="frequency"
                            name="frequency"
                            type="number"
                            register={register}
                            label="Digite a frequência"
                            required="Por favor, digite uma frequência"
                        />
                        <ButtonForm disabled={isPending}>Ativar contingência</ButtonForm>
                    </form>
                </div>
            }

            {(isSuccess && contingency.active) &&
                <div className="bg-white w-[400px]  mt-10 rounded-md p-5 flex flex-col items-center ">
                    <p className="font-semibold text-lg mb-5">Contingência está ativa</p>

                    <button
                        disabled={isPending}
                        className="p-2 bg-red-400 text-white font-bold py-3 rounded-md disabled:opacity-50"
                        onClick={onSubmitDeactivateContingency}>
                        Desativar contingência
                    </button>
                </div>
            }
        </div>
    )
}