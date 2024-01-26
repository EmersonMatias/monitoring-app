'use client'
import ButtonForm from "@/components/ButtonForm"
import InputOrange from "@/components/InputOrange.component"
import { useActivateContingency, useDeactivateContingency, useGetByUserIDContingency } from "@/hooks/hooks-contingency"
import { useEffect } from "react"
import { useForm } from "react-hook-form"


export default function CreateContingency({ params }: { readonly params: { id: string } }) {
    const { data: contingency, isSuccess } = useGetByUserIDContingency(Number(params.id))
    const { register, handleSubmit, setValue } = useForm<{ frequency: number }>()
    const { mutate: activateContingency } = useActivateContingency()
    const { mutate: deactivateContingency } = useDeactivateContingency()

    useEffect(() => {
        if (isSuccess) {
            setValue("frequency", contingency?.frequency)
        }

    }, [isSuccess, setValue, contingency])


    function onSubmitActiveContingency(data: { frequency: number }) {
        const ActivateContingencyData = {
            userId: Number(params.id),
            frequency: Number(data.frequency)
        }

        activateContingency(ActivateContingencyData)
    }

    function onSubmitDeactivateContingency() {
        deactivateContingency({ userId: Number(params.id) })
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {isSuccess && <h2 className="mt-10">Vigilante: {contingency?.user?.name}</h2>}

            {(isSuccess && !contingency.contigency) &&
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
                        <ButtonForm>Ativar contingência</ButtonForm>
                    </form>
                </div>
            }

            {(isSuccess && contingency.contigency) &&
                <div className="bg-white w-[400px]  mt-10 rounded-md p-5 flex flex-col items-center ">
                    <p className="font-semibold text-lg mb-5">Contingência está ativa</p>

                    <button
                        className="p-2 bg-red-400 text-white font-bold py-3 rounded-md"
                        onClick={onSubmitDeactivateContingency}>
                        Desativar contingência
                    </button>
                </div>
            }
        </div>
    )
}