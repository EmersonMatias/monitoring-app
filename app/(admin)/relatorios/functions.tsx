
export function agencyQueries(firstDate: string, endDate:string, agency: string){
    const dateGte = firstDate.split("-")
    const dateLte = endDate.split("-")

    const agencyId = Number(agency)

    const queries = {
        dayGte: dateGte[2],
        dayLte: dateLte[2],
        monthGte: dateGte[1],
        monthLte: dateLte[1],
        yearGte: dateGte[0],
        yearLte: dateLte[0],
        agencyId
    }

    return queries
}