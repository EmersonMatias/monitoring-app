import { getData } from "./requests";
import OrangeTable from "./components/OrangeTable.component";
import RedTable from "./components/RedTable.component";
import GreenTable from "./components/GreenTable.component";
import Header from "./components/Header.component";


export type TVigilant = {
    name: string,
    entryTime: string,
    departureTime: string,
}

/*
Se hour > currentHour ---> Alerta
currentDay
chegou: false/true
*/

export default async function Inicio() {
    const data = await getData()
    const date = new Date()
    const currentHour = date.getHours().toString()
    const currentMinutes = date.getMinutes().toString()
    console.log(data)

    const vigilantArrived: TVigilant[] = []
    const vigilantAlert: TVigilant[] = []
    const vigilantWaiting: TVigilant[] = []

    data.map((vigilant: TVigilant) => {
        const vigilantHour = vigilant.entryTime.substring(0, 2)
        const vigilantMinute = vigilant.entryTime.substring(3, 5)
        console.log(vigilantHour, vigilantMinute)
         

        if (vigilant.arrived) {
            vigilantArrived.push(vigilant)
        } else if (Number(currentHour) > Number(vigilantHour) || (Number(currentHour) === Number(vigilantHour) && Number(currentMinutes) > Number(vigilantMinute))) {
            vigilantAlert.push(vigilant)
        } else {
            vigilantWaiting.push(vigilant)
        }
    })
 
    console.log("ESPERANDO", vigilantWaiting)
    console.log("CHEGOU", vigilantArrived)
    console.log("ALERTA", vigilantAlert)
    console.log(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear())
    return (
        <main>
       
            <Header/>

            <input className="mt-20 ml-20 w-[600px] h-10 bg-stone-400 rounded-lg placeholder-stone-50 font-bold  p-4 " type="text" placeholder="Buscar" color="#FFFFFF" />

            <div className="px-20 py-3 mt-6 flex justify-between items-center font-bold">
                <h2 className="text-4xl">Status Agências</h2>
                <p className="text-xl">Filtrar</p>
            </div>

            <section className="px-20 flex gap-10">

                <GreenTable vigilantArrived={vigilantArrived} />
                <OrangeTable vigilantWaiting={vigilantWaiting}/>
                <RedTable vigilantAlert={vigilantAlert}/>

            </section>


        </main>
    )
}