'use client'
import { FormEvent, useState } from "react"
import styles from "../styles.module.css"
import { useCreateVigilant } from "@/hooks/hooks-vigilants";

export default function FormCriarVigilante() {
    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const styleInput = "pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
    const [createVigilantData, setCreateVigilantData] = useState<TCreateUser>(initialData)

    const { mutate: createUser, isPending } = useCreateVigilant(createVigilantData, initialData, setCreateVigilantData,setSucessMessage, setErrorMessage)

    async function handleSubmite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        createUser()
    }

    if (sucessMessage) {
        setTimeout(() => {

            setSucessMessage(false)
        }, 5000)
    }

    if (errorMessage) {
        setTimeout(() => {

            setErrorMessage(false)
        }, 5000)
    }

    console.log(createVigilantData)

    return (
        <div className={`w-[600px] h-[700px] text-[#0b0b0b] bg-white mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>
            <form className="flex flex-col" onSubmit={(event) => { handleSubmite(event) }}>
                <label htmlFor="name" className="text-base mb-2 font-bold">Nome Completo:</label>
                <input
                    type="text"
                    minLength={3}
                    maxLength={150}
                    disabled={isPending}
                    id="name"
                    placeholder="Digite o nome completo"
                    className={styleInput}
                    required
                    value={createVigilantData.name}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, name: event.target.value }))}
                />

                <label htmlFor="date" className=" text-base mb-2 font-bold">Data de Nascimento:</label>
                <input
                    type="date"
                    disabled={isPending}
                    id="date"
                    minLength={10}
                    maxLength={10}
                    placeholder="Digite a data de nascimento"
                    className={styleInput}
                    required
                    value={createVigilantData.dateofbirth}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, dateofbirth: event.target.value }))}
                />

                <label htmlFor="rg" className="text-base mb-2 font-bold">RG:</label>
                <input
                    type="text"
                    disabled={isPending}
                    id="rg"
                    placeholder="Digite o RG - Apenas números sem pontos ou espaço "
                    className={styleInput}
                    required
                    minLength={9}
                    maxLength={9}
                    value={createVigilantData.rg}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, rg: event.target.value.replace(/\D/g, '') }))}
                />

                <label htmlFor="cpf" className="text-base mb-2 font-bold">CPF:</label>
                <input
                    type="text"
                    disabled={isPending}
                    id="cpf"
                    placeholder="Digite o CPF - Apenas números sem pontos ou espaço "
                    className={styleInput}
                    required
                    minLength={11}
                    maxLength={11}
                    value={createVigilantData.cpf}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, cpf: event.target.value.replace(/\D/g, '') }))}

                />

                <label htmlFor="agencia" className="text-base mb-2 font-bold">Agência:</label>
                <input
                    type="text"
                    disabled={isPending}
                    id="agencia"
                    min={5}
                    className={styleInput}
                    required
                    value={createVigilantData.agency}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, agency: event.target.value }))}
                />

                <label htmlFor="horariodeentrada" className="text-base mb-2 font-bold">Horário de Entrada:</label>
                <input
                    type="time"
                    disabled={isPending}
                    id="horariodeentrada"
                    className={styleInput}
                    required
                    minLength={5}
                    maxLength={5}
                    value={createVigilantData.entryTime}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, entryTime: event.target.value }))}
                />

                <label htmlFor="horariodesaida" className="text-base mb-2 font-bold">Horário de Saída:</label>
                <input
                    type="time"
                    disabled={isPending}
                    id="horariodesaida"
                    className={styleInput}
                    required
                    value={createVigilantData.departureTime}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, departureTime: event.target.value }))}
                />

                <label htmlFor="login" className="text-base mb-2 font-bold">Login:</label>
                <input
                    type="text"
                    id="login"
                    disabled={isPending}
                    placeholder="Digite o login "
                    className={styleInput}
                    minLength={5}
                    maxLength={150}
                    required
                    value={createVigilantData.login}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, login: event.target.value }))}
                />

                <label htmlFor="senha" className="text-base mb-2 font-bold">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    placeholder="Digite a senha "
                    minLength={8}
                    maxLength={150}
                    className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
                    required
                    value={createVigilantData.password}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, password: event.target.value }))}
                    disabled={isPending}
                />

                <button className="bg-[#f0a830] py-3 mx-[150px] text-xl font-semibold rounded-md text-white disabled:opacity-50 " disabled={isPending}>{isPending ? "Criando usuário..." : "Criar Usuário"}</button>
            </form>

            <div className={`fixed font-bold text-2xl bottom-10 right-10 bg-green-500 bg-opacity-70 p-8 rounded-lg ${sucessMessage ? "" : "hidden"}`} >
                Conta criada com sucesso
            </div>

            <div className={`max-w-80 fixed text-center font-bold text-2xl bottom-10 right-10 bg-red-500 bg-opacity-70 p-8 rounded-lg ${errorMessage ? "" : "hidden"}`} >
                Conta não criada! Verifique os dados inseridos.
            </div>
        </div>
    )
}

const initialData = {
    name: "",
    dateofbirth: "",
    rg: "",
    cpf: "",
    agency: "",
    entryTime: "",
    departureTime: "",
    login: "",
    password: ""
}