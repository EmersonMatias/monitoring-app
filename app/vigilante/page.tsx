import { logged } from "../functions"
import SOSButton from "./SOSButton.component"
import Content from "./components/Content.component"
import Update from "./components/Update.component"
import VigilantHeader from "./components/VigilantHeader.component"
import styles from "./styles.module.css"

export default function Vigilante() {
    const userData = logged()

 

    return (
        <div className={`${styles.container} bg-blue-950 px-10`}>
            <VigilantHeader />

            <p className="text-2xl font-semibold mt-5">Vigilante: {userData.name}</p>

            <Content />
            <SOSButton />

            <Update token={userData.token}/>
        </div>
    )
}


