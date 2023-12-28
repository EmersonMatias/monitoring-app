import OrangeTable from "./components/OrangeTable.component";
import RedTable from "./components/RedTable.component";
import GreenTable from "./components/GreenTable.component";
import Header from "./components/Header.component";
import axios from "axios";

export type TVigilant = {
    name: string,
    arrived: boolean,
    hour: string,
    agency: string
}

export type TCheckpoints = {
    arrived: boolean,
    arrivalTime: string,
    date: string,
    user: {
        name: string,
        agency: string
        entryTime: string
    }
}

/*
{
    "arrived": true,
    "arrivalTime": "10:21",
    "date": "28/12/2023",
    "user": {
      "name": "Emerson Rodrigo",
      "agency": "Agência do Banco"
    }
*/

export default async function Inicio() {
  
    return (
        <main>
       
            <Header/>

            <input className="mt-20 ml-20 w-[600px] h-10 bg-stone-400 rounded-lg placeholder-stone-50 font-bold  p-4 " type="text" placeholder="Buscar" color="#FFFFFF" />

            <div className="px-20 py-3 mt-6 flex justify-between items-center font-bold">
                <h2 className="text-4xl">Status Agências</h2>
                <p className="text-xl">Filtrar</p>
            </div>

            <section className="px-20 flex gap-10">

                <GreenTable  />
                <OrangeTable />
                <RedTable />

            </section>


        </main>
    )
}