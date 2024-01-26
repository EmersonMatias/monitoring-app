import { redirect } from "next/navigation"
import { logged } from "../utils/functions"
import Header from "../components/Header/Header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const { accountType, token } = logged()
 
  if(token === undefined){
    return redirect("/")
  } 

  return (
    <>
      <Header />
      {accountType === "admin" ? children : null}
    </>
  )
}
