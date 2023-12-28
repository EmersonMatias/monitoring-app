'use client'


function handleButton(){

}

export default function Button({ checkpoint }: { checkpoint: any }) {
    return (
        <div className="flex justify-center mt-10">
            {checkpoint.arrived ?
                <div className="bg-green-500 py-4 px-8 rounded-lg">Checkpoint do dia realizado!</div> :
                <button className="bg-blue-600 py-4 px-8 rounded-lg cursor-pointer" onClick={() => handleButton()}>Fazer Checkpoint</button>
            }
        </div>
    )
}