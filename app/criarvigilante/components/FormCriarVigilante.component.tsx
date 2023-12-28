'use client'
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import styles from "../styles.module.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

async function handleSubmite(event: FormEvent<HTMLFormElement>, createVigilantData: {
    name: string;
    dateofbirth: string;
    rg: string;
    cpf: string;
    agency: string;
    entryTime: string;
    departureTime: string;
    login: string;
    password: string;
}, router: AppRouterInstance, setCreateVigilantData: Dispatch<SetStateAction<TInitialData>> ) {
    event.preventDefault()
    const [year, month, day] = createVigilantData.dateofbirth.split("-")
    const signupData = { ...createVigilantData, dateofbirth: `${day}/${month}/${year}`, accountType: "user" }
    console.log({ ...createVigilantData, dateofbirth: `${day}/${month}/${year}}`, accountType: "user" })

    try {
        const sucess = (await axios.post(`${process.env.BACKEND_URL}/cadastrar`, signupData))
        if (sucess.status === 201) {
            try {
                const response = await axios.post(`${process.env.BACKEND_URL}/createcheckpoint`, { userId: sucess.data.userId })
                console.log(response.data)
                if (response.data === "Checkpoint Created") {
                    setCreateVigilantData(initialData)
                    router.refresh()
                }
            } catch (error) {
                console.log(error)
            }
        }
        console.log(sucess.data.userId)
    } catch (error) {
        console.log(error)
    }


}


export default function FormCriarVigilante() {
    const [createVigilantData, setCreateVigilantData] = useState<TInitialData>(initialData)
    const router = useRouter()


    return (
        <div className={`w-[600px] h-[700px]  bg-black bg-opacity-50 mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>
            <form className="flex flex-col" onSubmit={(event) => { handleSubmite(event, createVigilantData, router, setCreateVigilantData) }}>
                <label htmlFor="name" className="text-white text-xl mb-2 font-bold">Nome Completo:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Digite o nome completo"
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.name}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, name: event.target.value }))}
                />

                <label htmlFor="date" className="text-white text-xl mb-2 font-bold">Data de Nascimento:</label>
                <input
                    type="date"
                    id="date"
                    placeholder="Digite a data de nascimento"
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.dateofbirth}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, dateofbirth: event.target.value }))}
                />

                <label htmlFor="rg" className="text-white text-xl mb-2 font-bold">RG:</label>
                <input
                    type="text"
                    id="rg"
                    placeholder="Digite o RG - Apenas números sem pontos ou espaço "
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    minLength={9}
                    maxLength={9}
                    value={createVigilantData.rg}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, rg: event.target.value }))}
                />

                <label htmlFor="cpf" className="text-white text-xl mb-2 font-bold">CPF:</label>
                <input
                    type="text"
                    id="cpf"
                    placeholder="Digite o CPF - Apenas números sem pontos ou espaço "
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    minLength={11}
                    maxLength={11}
                    value={createVigilantData.cpf}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, cpf: event.target.value }))}

                />

                <label htmlFor="agencia" className="text-white text-xl mb-2 font-bold">Agência:</label>
                <input
                    type="text"
                    id="agencia"
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.agency}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, agency: event.target.value }))}
                />

                <label htmlFor="horariodeentrada" className="text-white text-xl mb-2 font-bold">Horário de Entrada:</label>
                <input
                    type="time"
                    id="horariodeentrada"
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.entryTime}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, entryTime: event.target.value }))}
                />

                <label htmlFor="rg" className="text-white text-xl mb-2 font-bold">Horário de Saída:</label>
                <input
                    type="time"
                    id="horariodesaida"
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.departureTime}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, departureTime: event.target.value }))}
                />

                <label htmlFor="login" className="text-white text-xl mb-2 font-bold">Login:</label>
                <input
                    type="text"
                    id="login"
                    placeholder="Digite o login "
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.login}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, login: event.target.value }))}
                />

                <label htmlFor="senha" className="text-white text-xl mb-2 font-bold">Senha:</label>
                <input
                    type="password"
                    id="senha"
                    placeholder="Digite a senha "
                    className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    required
                    value={createVigilantData.password}
                    onChange={(event) => (setCreateVigilantData({ ...createVigilantData, password: event.target.value }))}

                />

                <button className="bg-blue-600 py-6 mx-20 text-2xl font-bold rounded-md">Criar Usuário</button>
            </form>
        </div>
    )
}