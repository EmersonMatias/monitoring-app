'use client'
import { FormEvent, useEffect, useState } from "react"
import { Signin } from "./loginFunction"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

type TFormSignin = {
    token: string | undefined
}

export default function FormSignin({ token }: TFormSignin) {
    const router = useRouter()
    const [signinData, setSigninData] = useState({
        login: "",
        password: ""
    })

    useEffect(() => {
        if (token !== undefined) {
            router.push("vigilante")
        }
    }, [token, router])


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const sucess = await Signin(signinData)

            if (sucess.status === 200) {
                Cookies.set("name", sucess.data.name)
                Cookies.set("token", sucess.data.token)
                Cookies.set("entryTime", sucess.data.entryTime)
                Cookies.set("userId", sucess.data.userId)

                router.push("vigilante")
            }
        } catch (error) {
            console.log(error)
            alert("Ocorreu um erro")
        }

    }

    return (
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>

            <label htmlFor="login" className="text-white text-xl mb-2 font-bold">Login</label>
            <input
                type="text"
                id="login"
                placeholder="Digite o seu login"
                className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                required
                minLength={5}
                onChange={(event) => { setSigninData({ ...signinData, login: event.target.value }) }}
            />

            <label htmlFor="password" className="text-white text-xl mb-2 font-bold">Senha</label>
            <input
                type="password"
                id="password"
                placeholder="Digite a sua senha"
                className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                required
                minLength={8}
                onChange={(event) => { setSigninData({ ...signinData, password: event.target.value }) }}
            />

            <button className="bg-blue-600 py-6  text-2xl font-bold rounded-md">Entrar</button>

        </form>

    )
}