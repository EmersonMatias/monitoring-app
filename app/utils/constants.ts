export function currentTime() {
    const date = new Date()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const currentTime = {
        hour, minutes, seconds
    }

    return currentTime
}

export function dateTime() {
    const currentDateTime = new Date().toLocaleString("pt-BR", {
        timeZone: 'America/Sao_Paulo',
        hour12: false, // Formato de 24 horas
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: "long"
    })

    const dayOfWeek = currentDateTime.split(", ")[0]

    const date = currentDateTime.split(", ")[1]
    const day = date.split("/")[0]
    const month = date.split("/")[1]
    const year = date.split("/")[2]

    const time = currentDateTime.split(", ")[2]
    const hour = time.split(":")[0]
    const minute = time.split(":")[1]
    const seconds = time.split(":")[2]

    return { day, month, year, hour, minute, seconds, date, time, dayOfWeek }
}