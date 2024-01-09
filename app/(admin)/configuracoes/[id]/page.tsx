'use client'
import { FormEvent, useEffect, useState } from "react"
import styles from "./styles.module.css"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export default function EditVigilant({ params }: { params: { id: string } }) {
    const { data: vigilant, isSuccess } = useQuery({
        queryKey: ["editvigilant"],
        queryFn: async () => {
            const data: AxiosResponse<TGetUserForUpdate> = await axios.get(`${process.env.BACKEND_URL}/vigilantwithstatus=${params.id}`)
            return data.data
        },
        refetchOnMount: true
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

    }, [isSuccess, vigilant, updateVigilantData.name])


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

    return (
        <div className="flex  flex-col items-center py-20">
            <div className="px-20 flex justify-between items-center font-bold">
                <h2 className="text-3xl">Editar vigilante</h2>
            </div>
        
        </div>
    )
}
