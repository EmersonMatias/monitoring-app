import axios from "axios";

type TSigninData = {
    login: string,
    password: string
}

export async function Signin(signinData: TSigninData){
    const response =  await axios.post(`${process.env.BACKEND_URL}/signin`, signinData)
    return response
}
