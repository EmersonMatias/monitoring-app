'use client'
import { FormEvent, useState } from "react"
import styles from "./styles.module.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Checkpoint({ params }: { params: { id: string } }) {
    const [checkpointData, setCheckpointData] = useState<string>("")
    const { data: vigilant, isSuccess, isPending } = useQuery({
        queryKey: ["userId"],
        queryFn: async () => {
            const data = await axios.get(`${process.env.BACKEND_URL}/vigilants/${params.id}`)
            return data.data
        },
        enabled: params.id !== undefined ? true : false
    })
    const [sucessMessage, setSucessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const { mutate} = useMutation({
        mutationFn: async () => {
            const dateSplit = checkpointData.split("-")
            const year = dateSplit[0]
            const month = dateSplit[1]
            const day = dateSplit[2]

            const date = {
                day,
                month,
                year
            }
            const response = await axios.post(`${process.env.BACKEND_URL}/checkpoint/create=${params.id}`, date)
            return response.data
        },
        onSuccess: () => {
            setSucessMessage(true)
        },
        onError: () => {
            setErrorMessage(true)
        }
    })

    console.log(checkpointData)

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

    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(checkpointData === ""){
            return alert("Por favor, selecione uma data!")
        }

        mutate()
    }


    return (
        <div className="flex justify-center">
            <div className={`w-[600px] h-[400px] text-[#0b0b0b] flex flex-col items-center justify-center bg-white mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>

                <div className="mb-10">
                    Vigilante: {vigilant?.name}
                </div>

                <form className="flex flex-col" onSubmit={(e) => handleSubmit(e) }>
                    <label htmlFor="name" className="text-base mb-2 font-bold">Escolha o dia que você quer criar o checkpoint para o vigilante:</label>
                    <input
                        type="date"
                        minLength={3}
                        maxLength={150}
                        id="name"
                        placeholder="Digite o nome completo"
                        className="pl-4 py-2 bg-[#fdd28846] rounded-xl mb-6 disabled:opacity-50"
                        required
                        onChange={(event) => (setCheckpointData(event.target.value))}
                    />
                    <button className="bg-[#f0a830] py-3 mx-[150px] text-xl font-semibold rounded-md text-white disabled:opacity-50 " disabled={isPending}>{isPending ? "Criando usuário..." : "Criar Usuário"}</button>

                </form>
            </div>

            <div className={`fixed font-bold text-2xl bottom-10 right-10 bg-green-500 bg-opacity-70 p-8 rounded-lg ${sucessMessage ? "" : "hidden"}`} >
                Checkpoint criada com sucesso
            </div>

            <div className={`max-w-80 fixed text-center font-bold text-2xl bottom-10 right-10 bg-red-500 bg-opacity-70 p-8 rounded-lg ${errorMessage ? "" : "hidden"}`} >
                Chekcpoint não criada! Verifique os dados inseridos.
            </div>
        </div>

    )
}