import H1 from "@/components/H1.component";
import FormCreateAgency from "./components/FormCreateAgency";

export default function CriarAgencia() {
    return (
        <main className="py-10 flex flex-col items-center">
            <H1>Criar Agência</H1>
            <FormCreateAgency />
        </main>
    )
}