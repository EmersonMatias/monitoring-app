import Link from "next/link";

export default function HeaderLink({ href, svg, notifications, name }: LinkCustomProps) {
    const notificationsExist = notifications !== undefined && notifications !== 0

    return (
        <Link href={href} className="relative flex flex-col items-center">
            {notificationsExist &&
                <div className={`text-white rounded-full w-[30px] h-[30px] flex justify-center items-center font-bold bg-red-500 absolute left-[18px] top-[-8px] bg-opacity-80 ${notifications === 0 && "hidden"}`}>
                    {notifications}
                </div>
            }

            {svg}
            <p className="mt-2 text-sm font-bold text-white max-w-[150px] text-center">{name}</p>
        </Link>
    )
}

type LinkCustomProps = {
    readonly href: string
    readonly svg: JSX.Element
    readonly notifications?: number
    readonly name: string
}