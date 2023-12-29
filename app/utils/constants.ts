const date = new Date()

export function todaysDate(){
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()

    const todaysDate = {
        day,month,year
    }
    
    return todaysDate
}

export function currentTime(){
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const currentTime = {
        hour,minutes,seconds
    }

    return currentTime
}