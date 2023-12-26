import Header from "../inicio/components/Header.component";
import styles from "./styles.module.css"

/** */

export default function CriarVigilante() {
    return (
        <main className={`${styles.bgimage} flex flex-col items-center`} >
            <Header />
            <div className={`w-[600px] h-[700px]  bg-black bg-opacity-50 mt-10 p-12 overflow-y-scroll ${styles.scrollable}`}>
                <form className="flex flex-col">
                    <label htmlFor="name" className="text-white text-xl mb-2 font-bold">Nome Completo:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Digite o nome completo"
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="date" className="text-white text-xl mb-2 font-bold">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="date"
                        placeholder="Digite a data de nascimento"
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="rg" className="text-white text-xl mb-2 font-bold">RG:</label>
                    <input
                        type="text"
                        id="rg"
                        placeholder="Digite o RG - Apenas números sem pontos ou espaço "
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="cpf" className="text-white text-xl mb-2 font-bold">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        placeholder="Digite o CPF - Apenas números sem pontos ou espaço "
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="usuario" className="text-white text-xl mb-2 font-bold">Usuário:</label>
                    <input
                        type="text"
                        id="usuario"
                        placeholder="Digite o usuário "
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="senha" className="text-white text-xl mb-2 font-bold">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        placeholder="Digite a senha "
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="horariodeentrada" className="text-white text-xl mb-2 font-bold">Horário de Entrada:</label>
                    <input
                        type="time"
                        id="horariodeentrada"
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <label htmlFor="rg" className="text-white text-xl mb-2 font-bold">Horário de Saída:</label>
                    <input
                        type="time"
                        id="horariodesaida"
                        className="pl-4 py-2 bg-blue-950 rounded-xl mb-6"
                    />

                    <button className="bg-blue-600 py-6 mx-20 text-2xl font-bold rounded-md">Criar Usuário</button>
                </form>
            </div>

        </main>
    )
}