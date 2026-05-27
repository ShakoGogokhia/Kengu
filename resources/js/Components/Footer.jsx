import React from 'react';
import {
    Heart,
    Mail,
    MapPin,
    Phone,
    ShoppingBag,
    ChevronRight,
} from 'lucide-react';

import {
    FaFacebookF,
    FaTiktok,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa";

import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-orange-100 bg-[#fffdfb]">

            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,146,68,0.07),transparent_35%)]" />

            <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">

                {/* TOP: BRAND + SECTIONS */}
                <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">

                    {/* BRAND */}
                    <div className="max-w-sm">
                        <Link href="/" className="group inline-block">
                            <h2 className="text-4xl font-black tracking-[0.35em] text-gray-900 group-hover:text-[#FF9244]">
                                KENGU
                            </h2>
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-[#FF9244]">
                                Georgia
                            </p>
                        </Link>

                        <p className="mt-4 text-sm leading-7 text-gray-500">
                            კომფორტული და უსაფრთხო კენგურუ ჩანთები თანამედროვე მშობლებისთვის — ხარისხი, სტილი და სიმარტივე.
                        </p>
                    </div>

                    {/* SECTIONS */}
                    <div className="flex flex-wrap gap-16">

                        {/* SHOP */}
                        <div>
                            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                მაღაზია
                            </h3>

                            <nav className="space-y-3">
                                {[
                                    { label: 'პროდუქტები', href: route('products.index') },
                                    { label: 'ფავორიტები', href: route('favorites.index') },
                                    { label: 'კალათა', href: route('cart.index') },
                                ].map((item) => (
                                    <Link key={item.label} href={item.href}
                                        className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#FF9244]">
                                        <ChevronRight size={15} className="text-gray-300" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* HELP */}
                        <div>
                            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                დახმარება
                            </h3>

                            <nav className="space-y-3">
                                <Link href={route('login')} className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#FF9244]">
                                    <ChevronRight size={15} className="text-gray-300" />
                                    ანგარიში
                                </Link>

                                <a href="mailto:support@kengu.ge" className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#FF9244]">
                                    <ChevronRight size={15} className="text-gray-300" />
                                    დახმარება
                                </a>

                                <a href="mailto:support@kengu.ge" className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-[#FF9244]">
                                    <ChevronRight size={15} className="text-gray-300" />
                                    კონტაქტი
                                </a>
                            </nav>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                კონტაქტი
                            </h3>

                            <div className="space-y-4 text-[15px] text-gray-600">

                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-[#FF9244]" />
                                    თბილისი, საქართველო
                                </div>

                                <a href="tel:+995500000000" className="flex items-center gap-2 hover:text-[#FF9244]">
                                    <Phone size={16} className="text-[#FF9244]" />
                                    +995 500 00 00 00
                                </a>

                                <a href="mailto:support@kengu.ge" className="flex items-center gap-2 hover:text-[#FF9244]">
                                    <Mail size={16} className="text-[#FF9244]" />
                                    support@kengu.ge
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SOCIALS (UNDER SECTIONS) */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

                    <a
                        href="https://www.instagram.com/kengu_georgiaofficial/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs hover:text-pink-500"
                    >
                        <FaInstagram /> Instagram
                    </a>

                    <a
                        href="https://www.facebook.com/profile.php?id=61559857286854"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs hover:text-blue-600"
                    >
                        <FaFacebookF /> Facebook
                    </a>

                    <a
                        href="https://www.tiktok.com/@kengu_georgiaofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs hover:text-black"
                    >
                        <FaTiktok /> TikTok
                    </a>

                    <a
                        href="https://www.youtube.com/@kengugeorgia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border px-5 py-2 text-xs hover:text-red-600"
                    >
                        <FaYoutube /> YouTube
                    </a>

                </div>


                <div className="mt-6 border-t border-orange-100 pt-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} Kengu Georgia. ყველა უფლება დაცულია.
                </div>

            </div>
        </footer>
    );
}