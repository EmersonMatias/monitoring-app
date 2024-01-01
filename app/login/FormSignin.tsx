'use client'
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import { Signin } from "./loginFunction"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

type TFormSignin = {
    token: string | undefined,
    accountType: string | undefined
}

export default function FormSignin({ token , accountType}: TFormSignin) {
    const router = useRouter()
    const [signinData, setSigninData] = useState({
        login: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    

    useEffect(() => {
        if (token !== undefined && accountType === "user") {
            router.push("vigilante")
        }else if (token !== undefined && accountType === "admin"){
            router.push("inicio")
        }
    }, [token, router, accountType])


    async function handleSubmit(event: FormEvent<HTMLFormElement>, setLoading: Dispatch<SetStateAction<boolean>> ) {
        event.preventDefault()
        setLoading(true)

        try {
            const sucess = await Signin(signinData)
            console.log(sucess.data)

            if (sucess.status === 200) {

                if (sucess.data.accountType === "user") {
                    Cookies.set("name", sucess.data.name)
                    Cookies.set("token", sucess.data.token)
                    Cookies.set("entryTime", sucess.data.entryTime)
                    Cookies.set("userId", sucess.data.userId)
                    Cookies.set("accountType", sucess.data.accountType)
                    Cookies.set("agency", sucess.data.agency )
                    router.push("vigilante")
                    setLoading(false)
                }else{
                    Cookies.set("name", sucess.data.name)
                    Cookies.set("token", sucess.data.token)
                    Cookies.set("accountType", sucess.data.accountType)
                    router.push("inicio")
                    setLoading(false)
                }


            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert("Ocorreu um erro")
        }

    }

    return (
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e, setLoading)}>

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

            <button className="bg-blue-600 py-6  text-2xl font-bold rounded-md disabled:opacity-50" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>

        </form>

    )
}