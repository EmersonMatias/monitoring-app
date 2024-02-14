import H1 from "@/components/H1.component"
import SettingsTable from "./SettingsTable"

export default function Configuraçoes() {
    return (
        <main className="flex flex-col items-center py-20">
            <H1>Configurações dos Vigilantes</H1>

            <SettingsTable />
        </main>
    )
}



