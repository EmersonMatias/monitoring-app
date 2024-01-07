
export function todaysDate(){
    const date = new Date()
    const day = date.getDate().toString().padStart(2, "0")
    const monthc = date.getMonth()+1
    const year = date.getFullYear()
    const month = monthc.toString().padStart(2,"0")

    const todaysDate = {
        day,month,year
    }
    
    return todaysDate
}

export function currentTime(){
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const currentTime = {
        hour,minutes,seconds
    }

    return currentTime
}