'use client'
import ButtonForm from "@/components/ButtonForm"
import ErrorMessage from "@/components/ErrorMessage"
import InputForm from "@/components/InputForm"
import SucessMessage from "@/components/SucessMessage"
import { resetQuery } from "@/functions/functions"
import { useCreateAgency } from "@/hooks/hooks-agency"
import { useForm } from "react-hook-form"

export default function FormCreateAgency() {
    const { register, reset: resetForm, handleSubmit, formState: { errors } } = useForm<CreateAgencyForm>()
    const { mutate: createAgency, isSuccess, isError, reset, error, isPending } = useCreateAgency(resetForm)

    const customError = error as CustomError

    resetQuery(isSuccess, isError, reset)

    return (
        <div className="w-[600px] p-10 bg-white">
            <form className="horizontal-center" onSubmit={handleSubmit((data) => createAgency(data))}>
                <InputForm
                    id="name"
                    name="name"
                    type="text"
                    label="Nome da Agência"
                    placeholder="Digite o nome da agência"
                    required="Digite uma agência"
                    minLength={{
                        value: 3,
                        message: "Digite um nome de agência de no mínimo 3 letras"
                    }}
                    message={errors?.name?.message}
                    register={register}
                />

                <ButtonForm disabled={isPending}>Criar</ButtonForm>
            </form>

            <SucessMessage hidden={!isSuccess}>Agência criada com Sucesso</SucessMessage>
            <ErrorMessage hidden={!isError}>{customError?.response?.data.message}</ErrorMessage>
        </div>
    )
}