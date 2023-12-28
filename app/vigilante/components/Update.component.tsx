'use client'

import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function Update({ token }: { token: string | undefined }) {
    const router = useRouter()


    useEffect(() => {
        if (token === undefined) {
            router.push("login")
        }
    }, [token, router])


    return (
        <div></div>
    )
}