import Header from "../inicio/components/Header.component";
import FormCriarVigilante from "./components/FormCriarVigilante.component";
import styles from "./styles.module.css"

export default function CriarVigilante() {
    return (
        <main className={`${styles.bgimage} flex flex-col items-center`} >
            <Header />
      
            <FormCriarVigilante/>

        </main>
    )
}