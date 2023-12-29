import Header from "../inicio/components/Header.component";
import FormCriarVigilante from "./components/FormCriarVigilante.component";

export default function CriarVigilante() {
    return (
        <main className={`flex flex-col items-center`} >
            <Header />
      
            <FormCriarVigilante/>

        </main>
    )
}