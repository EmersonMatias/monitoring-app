'use client'
import { FormEvent, useEffect, useState } from "react"
import styles from "./styles.module.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export default function EditVigilant({ params }: { params: { id: string } }) {
    const { data: vigilant, isSuccess, isRefetching} = useQuery({
        queryKey: ["editvigilant"],
        queryFn: async () => {
            const data: AxiosResponse<TGetUserForUpdate> = await axios.get(`${process.env.BACKEND_URL}/vigilantwithstatus=${params.id}`)
            return data.data
        },
        refetchOnMount: true,
        enabled: params.id.length !== 0
    })

    const initialData = {
        name: "",
        dateofbirth: "0000-00-00",
        rg: "",
        cpf: "",
        agency: "",
        entryTime: "",
        departureTime: "",
        login: "",
        password: "",
        frequency: 0
    }

    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [updateVigilantData, setUpdateVigilantData] = useState<TUpdateUser>(initialData)
    console.log(vigilant?.status[0].frequency)
    
    const styleInput = "pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tes = () => {
                if (isSuccess) {
                    const birthday = vigilant?.dateofbirth?.split("/")

                    setUpdateVigilantData({
                        name: vigilant?.name,
                        agency: vigilant?.agency,
                        cpf: vigilant?.cpf,
                        rg: vigilant?.rg,
                        entryTime: vigilant?.entryTime,
                        departureTime: vigilant?.departureTime,
                        dateofbirth: `${birthday[2]}-${birthday[1]}-${birthday[0]}`,
                        login: vigilant?.login,
                        password: "",
                        frequency: vigilant?.status[0]?.frequency
                    })
                }
            }

            tes()
        }

    }, [isSuccess, isRefetching])


    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: async () => {
            const [year, month, day] = updateVigilantData?.dateofbirth?.split("-")
            const response = await axios.post(`${process.env.BACKEND_URL}/updatevigilant/${params.id}`, { ...updateVigilantData, dateofbirth: `${day}/${month}/${year}` })
            console.log(response)
            return response.data
        },
        onSuccess: () => {
            setSucessMessage(true)
        },
        onError: () => {
            setErrorMessage(true)
        }
    })

    async function handleSubmite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        updateUser()
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
    console.log(updateVigilantData)

    return (
        <div className="flex  flex-col items-center py-20">
            <div className="px-20 flex justify-between items-center font-bold">
                <h2 className="text-3xl">Editar vigilante</h2>
            </div>
            {isSuccess &&
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
                            defaultValue={updateVigilantData?.name}
                            onChange={(event) => setUpdateVigilantData({...updateVigilantData, name: event.target.value })}
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
                            value={updateVigilantData?.dateofbirth}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, dateofbirth: event.target.value }))}
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
                            value={updateVigilantData.rg}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, rg: event.target.value.replace(/\D/g, '') }))}
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
                            value={updateVigilantData.cpf}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, cpf: event.target.value.replace(/\D/g, '') }))}

                        />

                        <label htmlFor="agencia" className="text-base mb-2 font-bold">Agência:</label>
                        <input
                            type="text"
                            disabled={isPending}
                            id="agencia"
                            min={5}
                            className={styleInput}
                            required
                            value={updateVigilantData.agency}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, agency: event.target.value }))}
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
                            value={updateVigilantData.entryTime}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, entryTime: event.target.value }))}
                        />

                        <label htmlFor="horariodesaida" className="text-base mb-2 font-bold">Horário de Saída:</label>
                        <input
                            type="time"
                            disabled={isPending}
                            id="horariodesaida"
                            className={styleInput}
                            required
                            value={updateVigilantData.departureTime}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, departureTime: event.target.value }))}
                        />

                        <label htmlFor="frequency" className="text-base mb-2 font-bold">Frequência de comunicação:</label>
                        <input
                            type="number"
                            id="frequency"
                            disabled={isPending}
                            placeholder="Digite a frequência de cominucação em minutos "
                            className={styleInput}
                            minLength={5}
                            maxLength={150}
                            required
                            value={updateVigilantData?.frequency}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, frequency: Number(event.target.value) }))}
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
                            value={updateVigilantData.login}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, login: event.target.value }))}
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
                            value={updateVigilantData.password}
                            onChange={(event) => (setUpdateVigilantData({ ...updateVigilantData, password: event.target.value }))}
                            disabled={isPending}
                        />

                        <button className="bg-[#f0a830] py-3 mx-[150px] text-xl font-semibold rounded-md text-white disabled:opacity-50 " disabled={isPending}>{isPending ? "Atualizando usuário..." : "Atualizar usuário"}</button>
                    </form>

                    <div className={`fixed font-bold text-2xl bottom-10 right-10 bg-green-500 bg-opacity-70 p-8 rounded-lg ${sucessMessage ? "" : "hidden"}`} >
                        Conta atualizada com sucesso.
                    </div>

                    <div className={`max-w-80 fixed text-center font-bold text-2xl bottom-10 right-10 bg-red-500 bg-opacity-70 p-8 rounded-lg ${errorMessage ? "" : "hidden"}`} >
                        Conta não atualizada! Verifique os dados inseridos.
                    </div>
                </div>
            }
        </div>
    )
}
