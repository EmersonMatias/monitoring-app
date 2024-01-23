'use client'
import styles from "../styles.module.css"
import { useCreateVigilant } from "@/hooks/hooks-vigilants";
import { useForm } from "react-hook-form";
import InputCreateVigilant from "@/components/InputCreateVigilant.component";

export default function FormCriarVigilante() {
    const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm<TCreateUser>()
    const { mutate: createUser, isPending, reset, isSuccess, isError } = useCreateVigilant(resetForm)

    if (isSuccess || isError) {
        setTimeout(() => {

            reset()
        }, 5000)
    }

    return (
        <div className={`w-[600px] h-[700px] text-[#0b0b0b] bg-white mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>
            <form className="flex flex-col" onSubmit={handleSubmit((data) => createUser(data))}>

                <InputCreateVigilant
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
                    message={errors.name && errors.name.message}
                />

                <InputCreateVigilant
                    id="dob"
                    name="dateofbirth"
                    type="date"
                    label="Data de Nascimento"
                    required="Digite uma data de nascimento"
                    register={register}
                    message={errors.dateofbirth && errors.dateofbirth.message}
                    validate={(data: string) => {
                        if (data.length !== 10) return "Digite uma data no formato DD/MM/YYYY"
                    }}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="rg"
                    name="rg"
                    type="text"
                    label="RG"
                    required="Digite um RG"
                    placeholder="Digite o RG - Apenas números sem pontos ou espaço"
                    register={register}
                    message={errors.rg && errors.rg.message}
                    validate={(data: string) => {
                        if (data.length !== 9) return "Digite um RG válido"
                    }}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="cpf"
                    name="cpf"
                    type="text"
                    label="CPF"
                    required="Digite um CPF"
                    placeholder="Digite o CPF - Apenas números sem pontos ou espaço"
                    register={register}
                    message={errors.cpf && errors.cpf.message}
                    validate={(data: string) => {
                        if (data.length !== 11) return "Digite um CPF válido"
                    }}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="agency"
                    name="agency"
                    type="text"
                    label="Agência"
                    required="Digite uma agência"
                    placeholder="Digite a agência"
                    register={register}
                    message={errors.agency && errors.agency.message}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="entryTime"
                    name="entryTime"
                    type="time"
                    label="Horário de Entrada"
                    required="Digite um horário de entrada"
                    register={register}
                    message={errors.entryTime && errors.entryTime.message}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="departureTime"
                    name="departureTime"
                    type="time"
                    label="Horário de Saída"
                    required="Digite um horário de saída"
                    register={register}
                    message={errors.departureTime && errors.departureTime.message}
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

                <InputCreateVigilant
                    id="frequency"
                    name="frequency"
                    type="number"
                    label="Frequência de comunicação:"
                    required="Digite um frequência de comunicação"
                    placeholder="Digite a frequência de cominucação em minutos "
                    register={register}
                    message={errors.frequency && errors.frequency.message}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="login"
                    name="login"
                    type="text"
                    label="Login"
                    required="Digite um login"
                    placeholder="Digite o login"
                    register={register}
                    message={errors.login && errors.login.message}
                    validate={(data: string) => {
                        if (data.length < 5) return "Digite um login de no mínimo 5 digitos"
                    }}
                    isPending={isPending}
                />

                <InputCreateVigilant
                    id="password"
                    name="password"
                    type="text"
                    label="Senha"
                    required="Digite um senha"
                    placeholder="Digite a senha"
                    register={register}
                    message={errors.password && errors.password.message}
                    validate={(data: string) => {
                        if (data.length < 8) return "Digite um senha de no mínimo 8 digitos"
                    }}
                    isPending={isPending}
                />

                <button className="bg-[#f0a830] py-3 mx-[150px] text-xl font-semibold rounded-md text-white disabled:opacity-50 " disabled={isPending}>{isPending ? "Criando usuário..." : "Criar Usuário"}</button>
            </form>

            <div className={`fixed font-bold text-2xl bottom-10 right-10 bg-green-500 bg-opacity-70 p-8 rounded-lg ${isSuccess ? "" : "hidden"}`} >
                Conta criada com sucesso
            </div>

            <div className={`max-w-80 fixed text-center font-bold text-2xl bottom-10 right-10 bg-red-500 bg-opacity-70 p-8 rounded-lg ${isError ? "" : "hidden"}`} >
                Conta não criada! Verifique os dados inseridos.
            </div>
        </div>
    )
}
