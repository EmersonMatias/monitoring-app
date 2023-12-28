import { logged } from "../functions"
import SOSButton from "./SOSButton.component"
import Content from "./components/Content.component"
import styles from "./styles.module.css"



export default function Vigilante() {
    const userData = logged()

 
    return (
        <div className={`${styles.container} bg-blue-950 px-10`}>
            <h1 className="text-4xl font-bold text-center py-4">Checkpoint</h1>
            <p className="text-2xl font-semibold mt-5">Vigilante: {userData.name}</p>

            <Content />
            <SOSButton />
        </div>
    )
}


