import EmergencyMessage from "./EmergencyMessage"
import Content from "./Content.component"
import VigilantHeader from "./components/VigilantHeader.component"
import styles from "./styles.module.css"
import ContingencyVigilant from "./contingency"
import Status from "./Status"

export default function Vigilante() {


    return (
        <div className={`${styles.container} px-5`}>
            <VigilantHeader />

            {/*<ContingencyVigilant userId={Number(userId)}/>*/}

            <Content />
            <EmergencyMessage />
            <Status />
        </div>
    )
}


