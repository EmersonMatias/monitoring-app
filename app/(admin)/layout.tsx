import Header from "./inicio/components/Header.component"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header/>
      {children}
    </>
  )
}
