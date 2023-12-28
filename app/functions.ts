import { cookies } from "next/headers"


export function logged() {

    const name = cookies().get("name")?.value
    const token = cookies().get("token")?.value
    const entryTime = cookies().get("entryTime")?.value
    const userId = cookies().get("userId")?.value

    const userData = {
        name, token, entryTime,userId
    }


    return userData
}