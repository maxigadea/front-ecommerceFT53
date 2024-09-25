import Link from "next/link";


export default function DashboardLayout({ children } : {children: React.ReactNode}) {
    return (
        <>
            <nav>
                <Link href="/dashboard">Perfil</Link>
                <Link href="/dashboard/orders">Ordenes</Link>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
};