import { logged } from "../utils/functions"
import SOSButton from "./SOSButton.component"
import Content from "./components/Content.component"
import Update from "./components/Update.component"
import VigilantHeader from "./components/VigilantHeader.component"
import styles from "./styles.module.css"

export default function Vigilante() {
    const userData = logged()

    return (
        <div className={`${styles.container} px-5`}>
            <VigilantHeader />

            <p className="text-xl font-semibold mt-5">Vigilante: {userData.name}</p>

            <Content />
            <SOSButton userId={Number(userData.userId)}/>

            <Update token={userData.token}/>
        </div>
    )
}


