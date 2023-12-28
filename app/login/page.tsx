import { logged } from "../functions"
import FormSignin from "./FormSignin"
import styles from "./styles.module.css"

    
export default function Login() {
    const userData = logged()
    console.log(userData.token)

    return (

        <main className={`${styles.bgimage} flex justify-center items-center`}>
            <div className=" bg-black bg-opacity-50 p-10 rounded-lg">
                <FormSignin token={userData.token} accountType={userData.accountType}/>
            </div>
        </main>
    )
}