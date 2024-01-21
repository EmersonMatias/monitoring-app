import { memo } from "react"

function Teste({ isSuccess, checkpointsRed }: { isSuccess: boolean, checkpointsRed(): TCheckpoints[] | undefined }) {
    console.log("teste")

    return (
        <>
            {checkpointsRed()?.map((checkpoint) => {
               return <div key={checkpoint.id}>{checkpoint.user.name}</div>
            })}
        </>
    )
}

export default memo(Teste)