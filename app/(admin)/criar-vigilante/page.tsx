import H1 from "@/components/H1.component";
import FormCriarVigilante from "./FormCriarVigilante.component";


export default function CriarVigilante() {
    return (
        <main className={`flex flex-col items-center py-10`} >
            <H1>Criar Vigilante</H1>
            <FormCriarVigilante/>
        </main>
    )
}