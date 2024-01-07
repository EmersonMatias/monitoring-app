import Link from "next/link";
import FormSignin from "./components/FormSignin";
import { redirectToInicio } from "./functions";
import styles from "./styles.module.css"

export default function Home() {
  redirectToInicio()

  return (
    <main className={`${styles.bgimage} flex justify-center items-center`}>

      <div className=" bg-black bg-opacity-50 p-10 rounded-lg">
        <FormSignin/>
      </div>

      <Link href="https://ip.epavi360gps.com.br/login" className="fixed bottom-10 right-10">
        <svg className="w-[60px] h-[60px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="m17.351 3.063-8-3a1.009 1.009 0 0 0-.7 0l-8 3A1 1 0 0 0 0 4a19.394 19.394 0 0 0 8.47 15.848 1 1 0 0 0 1.06 0A19.394 19.394 0 0 0 18 4a1 1 0 0 0-.649-.937Zm-3.644 4.644-5 5A1 1 0 0 1 8 13c-.033 0-.065 0-.1-.005a1 1 0 0 1-.733-.44l-2-3a1 1 0 0 1 1.664-1.11l1.323 1.986 4.138-4.138a1 1 0 0 1 1.414 1.414h.001Z" />
        </svg>
      </Link>
    </main>
  )
}
