import { logged } from "../utils/functions"
import SOSButton from "./SOSButton.component"
import Content from "./components/Content.component"
import StatusButton from "./components/Status.component"
import VigilantHeader from "./components/VigilantHeader.component"
import styles from "./styles.module.css"
import ContingencyVigilant from "./contingency"

export default function Vigilante() {
    const { userId, name } = logged()
 
    return (
        <div className={`${styles.container} px-5`}>
            <VigilantHeader />
        
            <ContingencyVigilant userId={Number(userId)}/>
          
            <Content  name={name}/>
            <SOSButton userId={Number(userId)} />
            <StatusButton userId={Number(userId)} />
        </div>
    )
}


