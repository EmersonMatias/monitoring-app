import InputForm from "@/components/InputForm"
import { useUpdateVigilant } from "@/hooks/hooks-vigilants"
import { useForm } from "react-hook-form"
import { handleFormEditVigilant, initialDataFormEditVigilant } from "../functions"
import SucessMessage from "@/components/SucessMessage"
import ErrorMessage from "@/components/ErrorMessage"
import ButtonForm from "@/components/ButtonForm"

export default function FormEditVigilant({ id, vigilant, agencies }: { readonly id: number, readonly vigilant: TVigilant2, readonly agencies: TAgency[] }) {
    const { register, handleSubmit, formState: { errors } } = useForm<TUpdateUser>({
        defaultValues: initialDataFormEditVigilant(vigilant)
    })

    const { mutate: updateVigilant, isPending, reset, isSuccess, isError } = useUpdateVigilant()

    if (isSuccess || isError) {
        setTimeout(() => {

            reset()
        }, 5000)
    }

    return (
        <div className={`w-[600px] h-[600px] text-[#0b0b0b] bg-white p-10 overflow-y-scroll `}>
            <form className="horizontal-center" onSubmit={handleSubmit((data) => handleFormEditVigilant(data, updateVigilant, id))}>

                <InputForm
                    id="name"
                    name="name"
                    type="text"
                    label="Nome"
                    isPending={isPending}
                    placeholder="Digite o nome completo"
                    minLength={{
                        value: 3,
                        message: "Digite um nome com ao menos 3 letras"
                    }}
                    required="Digite um nome"
                    register={register}
                    message={errors?.name?.message}
                />

                <InputForm
                    id="dob"
                    name="dateofbirth"
                    type="date"
                    label="Data de Nascimento"
                    required="Digite uma data de nascimento"
                    register={register}
                    message={errors?.dateofbirth?.message}
                    validate={(data: string) => {
                        if (data.length !== 10) return "Digite uma data no formato DD/MM/YYYY"
                    }}
                    isPending={isPending}
                />

                <InputForm
                    id="rg"
                    name="rg"
                    type="text"
                    label="RG"
                    required="Digite um RG"
                    placeholder="Digite o RG - Apenas números sem pontos ou espaço"
                    register={register}
                    message={errors?.rg?.message}
                    validate={(data: string) => {
                        if (data.length !== 9) return "Digite um RG válido"
                    }}
                    isPending={isPending}
                />

                <InputForm
                    id="cpf"
                    name="cpf"
                    type="text"
                    label="CPF"
                    required="Digite um CPF"
                    placeholder="Digite o CPF - Apenas números sem pontos ou espaço"
                    register={register}
                    message={errors?.cpf?.message}
                    validate={(data: string) => {
                        if (data.length !== 11) return "Digite um CPF válido"
                    }}
                    isPending={isPending}
                />

                <select
                    disabled={isPending}
                    {...register("agencyId", {
                        required: "Escolha uma opção"
                    })}
                    className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-2 disabled:opacity-50 mt2">

                    <option value="">Escolha uma agência</option>
                    {agencies?.map((agency) => {
                        return <option key={agency.id} value={agency.id}>{agency.name}</option>

                    })}

                </select>
                {errors.agencyId && <p className="pl-2 font-bold text-red-600">{errors.agencyId.message}</p>}

                <InputForm
                    id="entryTime"
                    name="entryTime"
                    type="time"
                    label="Horário de Entrada"
                    required="Digite um horário de entrada"
                    register={register}
                    message={errors?.entryTime?.message}
                    isPending={isPending}
                />

                <InputForm
                    id="departureTime"
                    name="departureTime"
                    type="time"
                    label="Horário de Saída"
                    required="Digite um horário de saída"
                    register={register}
                    message={errors?.departureTime?.message}
                    isPending={isPending}
                />

                <select
                    disabled={isPending}
                    {...register("saturday", {
                        required: "Escolha uma opção"
                    })}
                    className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-2 disabled:opacity-50 mt-2">

                    <option value="">O vigilante trabalha de sábado?</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
                {errors.saturday && <p className="pl-2 font-bold text-red-600">{errors.saturday.message}</p>}

                <select
                    disabled={isPending}
                    {...register("sunday", {
                        required: "Escolha uma opção"
                    })}
                    className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-2 disabled:opacity-50 mt2">

                    <option value="">O vigilante trabalha de domingo?</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
                {errors.sunday && <p className="pl-2 font-bold text-red-600">{errors.sunday.message}</p>}

                <InputForm
                    id="frequency"
                    name="frequency"
                    type="number"
                    label="Frequência de comunicação:"
                    required="Digite um frequência de comunicação"
                    placeholder="Digite a frequência de cominucação em minutos "
                    register={register}
                    message={errors?.frequency?.message}
                    isPending={isPending}
                />

                <InputForm
                    id="login"
                    name="login"
                    type="text"
                    label="Login"
                    required="Digite um login"
                    placeholder="Digite o login"
                    register={register}
                    message={errors?.login?.message}
                    validate={(data: string) => {
                        if (data.length < 5) return "Digite um login de no mínimo 5 digitos"
                    }}
                    isPending={isPending}
                />

                    <ButtonForm disabled={isPending}>{isPending ? "Editando Vigilante..." : "Editar Vigilante"}</ButtonForm>
            </form>


            <SucessMessage hidden={!isSuccess}>Vigilante editado com sucesso</SucessMessage>
            <ErrorMessage hidden={!isError}>Erro ao editar vigilante. Verifique os dados!</ErrorMessage>
        </div>
    )
}