import { logged } from "../utils/functions"
import SOSButton from "./SOSButton.component"
import Content from "./components/Content.component"
import VigilantHeader from "./components/VigilantHeader.component"
import styles from "./styles.module.css"

export default function Vigilante() {
    const {userId, name} = logged()
  
    return (
        <div className={`${styles.container} px-5 mb-20`}>
            <VigilantHeader />

            <p className="text-xl font-semibold mt-5 mb-3">Vigilante: {name}</p>

            <Content />
            <SOSButton userId={Number(userId)}/>


        </div>
    )
}


