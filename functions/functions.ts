export function resetQuery(isSuccess: boolean, isError: boolean, reset: () => void) {
    if (isSuccess || isError) {
        setTimeout(() => {

            reset()
        }, 5000)
    }
}

export function convertTimeToUTC(time: string) {
    const timeUTC = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    timeUTC.setHours(hours);
    timeUTC.setMinutes(minutes);
    timeUTC.setSeconds(0);

    return timeUTC
}


export function convertTimeToBrasilia(time: Date) {

    const timeBrasilia = new Date(time).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    return timeBrasilia
}

export function convertDateToBrasilia(date: Date) {
    return date.toString().split('T')[0]
}

export function formatDateToBR(date: Date) {
    const [year, month, day] = date.toString().split('T')[0].split('-')
    const dateFormated = `${day}/${month}/${year}`

    return dateFormated
}

export function formatDateTimeToBR(date: Date) {
    const dateTime = new Date(date).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return dateTime
}