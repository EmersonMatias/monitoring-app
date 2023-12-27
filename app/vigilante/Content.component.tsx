import Button from "./Button.component"
/**import { getLocalStorageData } from "./functions" */
/**import { getUserCheckpoints } from "./requests" */

export default async function Content() {
    /**    const localStorageData = getLocalStorageData() */
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const currentDay = `${day}/${month}/${year}`
    const userId = 1
    /**  const data = await getUserCheckpoints(userId) */


    return (
        <div>
            {/**
        *      {data.map((checkpoint: any) => {
                if (checkpoint.date === currentDay) {
                    return (
                        <div key={checkpoint.id}>
                            <div><span className="font-bold">Dia:</span> {checkpoint.date}</div>
                            <div><span className="font-bold">Horário de Chegada:</span> {checkpoint.arrivalTime === "null" ? "Checkpoint não cadastrado" : checkpoint.arrivalTime} </div>

                            <div>
                                <span className="font-bold">Checkpoint Status: </span>
                                {checkpoint.arrived ?
                                    <span className="bg-green-500">Checkpoint realizado com sucesso!</span> :
                                    <span className="bg-red-500">Aguardando checkpoint.</span>}
                            </div>
                            <Button checkpoint={checkpoint} />
                        </div>)
                }
            })}
        * 
        */}
        </div>
    )
}