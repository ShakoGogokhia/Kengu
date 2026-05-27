import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, User, ChevronDown } from 'lucide-react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Header() {
    const { auth, counts } = usePage().props;
    const [showSearch, setShowSearch] = useState(false);
    const { data, setData, get } = useForm({ search: '' });

    const submitSearch = (event) => {
        event.preventDefault();
        get(route('products.index'), {
            preserveState: false,
            preserveScroll: false,
        });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <img
                        src="/images/kengu.png"
                        alt="Kengu Georgia Bags Logo"
                        className="h-14 w-14 object-contain"
                    />
                    <span className="text-xl font-bold tracking-widest text-gray-900">KENGU</span>
                </Link>

                <nav className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
                    <Link href={route('products.index')} className="transition-colors hover:text-[#FF9244]">
                        პროდუქტები
                    </Link>
                    {auth.user?.is_admin && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="flex items-center gap-1 transition-colors hover:text-[#FF9244]">
                                    ადმინ პანელი
                                    <ChevronDown size={14} />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="py-1 bg-white">
                                <Dropdown.Link href={route('admin.hero-slides.index')}>
                                    კარუსელი & პარამეტრები
                                </Dropdown.Link>
                                <Dropdown.Link href={route('admin.products.index')}>
                                    პროდუქტების მართვა
                                </Dropdown.Link>
                                <Dropdown.Link href={route('admin.orders.index')}>
                                    შეკვეთები
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </nav>

                <div className="flex items-center gap-4">
                    {showSearch && (
                        <form onSubmit={submitSearch} className="hidden sm:block">
                            <input
                                value={data.search}
                                onChange={(event) => setData('search', event.target.value)}
                                placeholder="გლობალური ძებნა"
                                className="w-44 rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                            />
                        </form>
                    )}

                    <button
                        onClick={() => setShowSearch((value) => !value)}
                        className="p-2 text-gray-600 transition-colors hover:text-[#FF9244]"
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </button>

                    <Link href={auth.user ? route('favorites.index') : route('login')} className="relative p-2 text-gray-600 transition-colors hover:text-[#FF9244]" aria-label="Favorites">
                        <Heart size={20} />
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF9244] text-[10px] font-bold text-white">
                            {counts?.favorites ?? 0}
                        </span>
                    </Link>

                    <Link href={auth.user ? route('cart.index') : route('login')} className="relative p-2 text-gray-600 transition-colors hover:text-[#FF9244]" aria-label="Cart">
                        <ShoppingBag size={20} />
                        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF9244] text-[10px] font-bold text-white">
                            {counts?.cart ?? 0}
                        </span>
                    </Link>

                    <div className="ml-2 hidden items-center gap-4 border-l border-gray-100 pl-4 sm:flex">
                        {auth.user ? (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="group flex items-center gap-2 transition-all">
                                        <div className="hidden text-right lg:block">
                                            <p className="text-xs font-semibold leading-none text-gray-900">{auth.user.name}</p>
                                            <p className="mt-1 text-[10px] text-gray-500">ჩემი პროფილი</p>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-100 bg-orange-50 text-[#FF9244] transition-colors group-hover:bg-[#FF9244] group-hover:text-white">
                                            <User size={20} />
                                        </div>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <Dropdown.Link href={route('profile.edit')}>
                                        პროფილის პარამეტრები
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('orders.index')}>
                                        შეკვეთები
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        გასვლა
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-semibold text-gray-600 transition-colors hover:text-[#FF9244]">
                                    შესვლა
                                </Link>
                                <Link href={route('register')} className="rounded-xl bg-[#FF9244] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition-all hover:bg-[#e88238]">
                                    რეგისტრაცია
                                </Link>
                            </>
                        )}
                    </div>

                    <button className="p-2 text-gray-600 hover:text-[#FF9244] md:hidden">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
