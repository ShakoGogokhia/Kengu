import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    return (
        <header className="w-full py-6 px-6 lg:px-8 flex justify-between items-center bg-white dark:bg-[#0A0A0A] border-b border-[#e5e7eb] dark:border-[#1a1a1a]">
            <div className="flex lg:flex-1">
                <Link href="/">
                    {/* Your Header Logo */}
                    <ApplicationLogo className="h-10 w-auto fill-current text-[#FF2D20]" />
                </Link>
            </div>
            <div className="flex gap-4">
                <Link
                    href={route('login')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Log in
                </Link>
                <Link
                    href={route('register')}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Register
                </Link>
            </div>
        </header>
    );
}