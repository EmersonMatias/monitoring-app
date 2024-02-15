'use client'
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosResponse } from "axios"

export default function FormSignin() {
    const router = useRouter()
    const [signinData, setSigninData] = useState({
        login: "",
        password: ""
    })

    const { isPending, mutate } = useMutation({
        mutationFn: async () => {
            const response: AxiosResponse<TSigninResponse> = await axios.post(`${process.env.BACKEND_URL}/signin`, signinData)

            console.log(response)
            return response

        },
        onSuccess: ({ data }) => {
            if (data.accountType === "user") {
                Cookies.set("name", data.name)
                Cookies.set("token", data.token)
                Cookies.set("entryTime", data.entryTime)
                Cookies.set("userId", data.userId)
                Cookies.set("accountType", data.accountType)
                Cookies.set("agencyId", data.agency)
                router.push("vigilante")

            } else {
                Cookies.set("name", data.name)
                Cookies.set("token", data.token)
                Cookies.set("accountType", data.accountType)
                router.push("inicio")
            }
        },
        onError: ({ name, message }) => {
            console.log(name, message)
        }
    })

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        mutate()
    }

    return (
        <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>

            <label htmlFor="login" className="text-white text-xl mb-2 font-bold">Login</label>
            <input
                type="text"
                id="login"
                placeholder="Digite o seu login"
                className="pl-4 py-2 bg-blue-950 rounded-xl mb-6 text-white"
                required
                minLength={5}
                onChange={(event) => { setSigninData({ ...signinData, login: event.target.value }) }}
            />

            <label htmlFor="password" className="text-white text-xl mb-2 font-bold">Senha</label>
            <input
                type="password"
                id="password"
                placeholder="Digite a sua senha"
                className="pl-4 py-2 bg-blue-950 rounded-xl mb-6 text-white"
                required
                minLength={8}
                onChange={(event) => { setSigninData({ ...signinData, password: event.target.value }) }}
            />

            <button className="bg-blue-600 py-6  text-2xl font-bold rounded-md disabled:opacity-50" disabled={isPending}>{isPending ? "Entrando..." : "Entrar"}</button>
        </form>
    )
}