import { ComponentProps } from "react"

type ErrorMessageProps = ComponentProps<'div'>

export default function ErrorMessage({...props}: ErrorMessageProps){
    return(
        <div {...props} className="fixed bottom-10 right-10 bg-red-400 p-5 text-lg font-bold text-white rounded-md"/>
    )
}