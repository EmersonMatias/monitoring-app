'use client'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import styles from "../styles.module.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Cookies from "js-cookie";

type TInitialData = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string;
    login: string;
    password: string;
}

type TVigilantData = {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string;
    login: string;
    password: string;
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

async function handleSubmite(
    event: FormEvent<HTMLFormElement>,
    createVigilantData: TVigilantData,
    router: AppRouterInstance,
    setCreateVigilantData: Dispatch<SetStateAction<TInitialData>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setSucessMessage: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<boolean>>
) {
    event.preventDefault()
    const [year, month, day] = createVigilantData.dateofbirth.split("-")
    const signupData = { ...createVigilantData, dateofbirth: `${day}/${month}/${year}`, accountType: "user" }
    setLoading(true)

    try {
        const sucess = (await axios.post(`${process.env.BACKEND_URL}/cadastrar`, signupData))
        if (sucess.status === 201) {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}/createcheckpoint`, { userId: sucess.data.userId })
                if (response.data === "Checkpoint Created") {
                    setLoading(false)
                    setSucessMessage(true)
                    setCreateVigilantData(initialData)
                    router.refresh()
                }
            } catch (error) {
                setErrorMessage(true)
                setLoading(false)
                console.log(error)
            }
        }
    } catch (error) {
        setErrorMessage(true)
        setLoading(false)
        console.log(error)
    }


}

export default function FormCriarVigilante() {
    const [loading, setLoading] = useState(false)
    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const styleInput = "pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
    const [createVigilantData, setCreateVigilantData] = useState<TInitialData>(initialData)
    const router = useRouter()
    const token = Cookies.get("token")

    if(sucessMessage){
        setTimeout(() => {

            setSucessMessage(false)
        }, 5000)
    }

    if(errorMessage){
        setTimeout(() => {

            setErrorMessage(false)
        }, 5000)
    }

    useEffect(() => {
        if(token === undefined){
            return router.push("/")
        }
    }, [])

    return (
        <div className={`w-[600px] h-[700px] text-[#0b0b0b] bg-white mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>
            <form className="flex flex-col" onSubmit={(event) => { handleSubmite(event, createVigilantData, router, setCreateVigilantData, setLoading, setSucessMessage, setErrorMessage) }}>
                <label htmlFor="name" className="text-base mb-2 font-bold">Nome Completo:</label>
                <input
                    type="text"
                    disabled={loading}
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
                    disabled={loading}
                    id="date"
                    placeholder="Digite a data de nascimento"
                    className={styleInput}
                    required
                    value={createVigilantData.dateofbirth}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, dateofbirth: event.target.value }))}
                />

                <label htmlFor="rg" className="text-base mb-2 font-bold">RG:</label>
                <input
                    type="text"
                    disabled={loading}
                    id="rg"
                    placeholder="Digite o RG - Apenas números sem pontos ou espaço "
                    className={styleInput}
                    required
                    minLength={9}
                    maxLength={9}
                    value={createVigilantData.rg}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, rg: event.target.value }))}
                />

                <label htmlFor="cpf" className="text-base mb-2 font-bold">CPF:</label>
                <input
                    type="text"
                    disabled={loading}
                    id="cpf"
                    placeholder="Digite o CPF - Apenas números sem pontos ou espaço "
                    className={styleInput}
                    required
                    minLength={11}
                    maxLength={11}
                    value={createVigilantData.cpf}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, cpf: event.target.value }))}

                />

                <label htmlFor="agencia" className="text-base mb-2 font-bold">Agência:</label>
                <input
                    type="text"
                    disabled={loading}
                    id="agencia"
                    className={styleInput}
                    required
                    value={createVigilantData.agency}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, agency: event.target.value }))}
                />

                <label htmlFor="horariodeentrada" className="text-base mb-2 font-bold">Horário de Entrada:</label>
                <input
                    type="time"
                    disabled={loading}
                    id="horariodeentrada"
                    className={styleInput}
                    required
                    value={createVigilantData.entryTime}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, entryTime: event.target.value }))}
                />

                <label htmlFor="rg" className="text-base mb-2 font-bold">Horário de Saída:</label>
                <input
                    type="time"
                    disabled={loading}
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
                    disabled={loading}
                    placeholder="Digite o login "
                    className={styleInput}
                    required
                    value={createVigilantData.login}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, login: event.target.value }))}
                />

                <label htmlFor="senha" className="text-base mb-2 font-bold">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    placeholder="Digite a senha "
                    className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
                    required
                    value={createVigilantData.password}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, password: event.target.value }))}
                    disabled={loading}
                />

                <button className="bg-[#f0a830] py-3 mx-[150px] text-xl font-bold rounded-md disabled:opacity-50" disabled={loading}>{loading ? "Criando usuário..." : "Criar Usuário"}</button>
            </form>

            <div className={`fixed font-bold text-2xl bottom-10 right-10 bg-green-500 bg-opacity-70 p-8 rounded-lg ${sucessMessage ? "" : "hidden" }`} >
                Conta criada com sucesso
            </div>

            <div className={`max-w-80 fixed text-center font-bold text-2xl bottom-10 right-10 bg-red-500 bg-opacity-70 p-8 rounded-lg ${errorMessage ? "" : "hidden" }`} >
                Conta não criada! Verifique os dados inseridos.
            </div>
        </div>
    )
}