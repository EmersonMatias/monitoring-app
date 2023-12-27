'use client'

import { FormEvent, useState } from "react"
/**import { Signin } from "./loginFunction" */
import { useRouter } from "next/navigation"

export default function FormSignin() {

    const router = useRouter()
    const [signinData, setSigninData] = useState({
        login: "",
        password: ""
    })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

     /**
      *    const sucess = await Signin(signinData)
        if (sucess.status === 200) {
            localStorage.setItem("entryTime", sucess.data.entryTime)
            localStorage.setItem("name", sucess.data.name)
            localStorage.setItem("token", sucess.data.token)
            router.push("/vigilante")
        }
      */

    }

    console.log(signinData)

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