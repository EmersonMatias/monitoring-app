import { ComponentProps } from "react"

type SuccessMessageProps = ComponentProps<'div'>

export default function SucessMessage({...props}: SuccessMessageProps){
    return(
        <div {...props} className="fixed bottom-10 right-10 bg-green-400 p-5 text-lg font-bold text-white rounded-md"/>
    )
}