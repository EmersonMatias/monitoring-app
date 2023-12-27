import axios from "axios";

export async function Signin(signinData){
    const response =  await axios.post("http://localhost:4000/signin", signinData)
    return response
}