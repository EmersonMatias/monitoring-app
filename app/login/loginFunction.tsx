import axios, { AxiosResponse } from "axios";

type TSigninData = {
    login: string,
    password: string
}

type TSigninResponse = {
    name: string,
    userId: string,
    entryTime: string,
    token: string,
    accountType: "admin" | "user"
}

export async function Signin(signinData: TSigninData){
    const response:AxiosResponse<TSigninResponse> =  await axios.post(`${process.env.BACKEND_URL}/signin`, signinData)
    return response
}
