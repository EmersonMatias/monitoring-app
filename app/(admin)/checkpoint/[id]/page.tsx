'use client'
import styles from "./styles.module.css"
import SucessMessage from "@/components/SucessMessage"
import ErrorMessage from "@/components/ErrorMessage"
import H1 from "@/components/H1.component"
import InputForm from "@/components/InputForm"
import ButtonForm from "@/components/ButtonForm"
import { useFindUniqueVigilant } from "@/hooks/hooks-vigilants"
import { useCreateCheckpoint } from "@/hooks/hooks-checkpoints"
import { useForm } from "react-hook-form"
import { onSubmitCreateCheckpointForm } from "./functions"

export default function Checkpoint({ params: { id } }: { readonly params: { id: string } }) {
    const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<CreateCheckpointForm>()
    const { data: vigilant } = useFindUniqueVigilant(Number(id))
    const { mutate: createCheckpoint, isPending, isSuccess, isError, reset } = useCreateCheckpoint(resetForm)

    if (isSuccess || isError) {
        setTimeout(() => {

            reset()
        }, 5000)
    }

    console.log(vigilant)

    return (
        <div className="flex flex-col items-center justify-center py-10">
            {vigilant &&
                <>
                    <H1>Criar Checkpoint</H1>

                    <div className={`w-[600px] text-[#0b0b0b] flex flex-col items-center justify-center bg-white p-12 overflow-y-scroll ${styles.scrollable}`}>

                        <div className="mb-10">
                            <span className="text-lg font-bold">Vigilante:</span> {vigilant?.name}
                        </div>

                        <form className="horizontal-center" onSubmit={handleSubmit((data) => onSubmitCreateCheckpointForm(data, Number(id), createCheckpoint))}>

                            <InputForm
                                id="date"
                                name="date"
                                type="date"
                                label="Escolha o dia que você quer criar o checkpoint para o vigilante:"
                                register={register}
                                required="Por favor, digite uma data"
                                message={errors.date?.message}
                            />
                            <ButtonForm disabled={isPending}>{isPending ? "Criando Checkpoint..." : "Criar Checkpoint"}</ButtonForm>
                        </form>
                    </div>

                    <SucessMessage hidden={!isSuccess}>Checkpoint criado com sucesso.</SucessMessage>
                    <ErrorMessage hidden={!isError}>Checkpoint não foi criado. Verifique os dados!</ErrorMessage>
                </>}
        </div>

    )
}