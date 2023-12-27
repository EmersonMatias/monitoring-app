'use client'
import { useEffect } from "react"
import Content from "./Content.component"
import styles from "./styles.module.css"
import { getLocalStorageData } from "./functions"
import SOSButton from "./SOSButton.component"

export default function Vigilante() {
   const localStorageData = getLocalStorageData()
    return (
        <div className={`${styles.container} bg-blue-950 px-10`}>
            <h1 className="text-4xl font-bold text-center py-4">Checkpoint</h1>
            <p className="text-2xl font-semibold mt-5">Vigilante</p>
            <p className="text-base">Emerson Rodrigo</p>

            <Content />

            <SOSButton/>
           

        </div>
    )
}