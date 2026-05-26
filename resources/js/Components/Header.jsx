import React from 'react';
import { ShoppingBag, Heart, Search, Menu } from 'lucide-react'; // Example icon library

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo Area */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img
                        src="/images/kengu.png"
                        alt="Kengu Georgia Bags Logo"
                        className="h-14 w-14 object-contain"
                    />
                    <span className="text-xl font-bold tracking-widest text-gray-900">KENGU</span>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a href="#backpacks" className="hover:text-[#FF9244] transition-colors">ჩანთები</a>
                    <a href="#about" className="hover:text-[#FF9244] transition-colors">კომპანიის შესახებ</a>
                </nav>

                {/* Icons / Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:text-[#FF9244] transition-colors" aria-label="Search">
                        <Search size={20} />
                    </button>

                    <button className="p-2 text-gray-600 hover:text-[#FF9244] transition-colors relative" aria-label="Favorites">
                        <Heart size={20} />
                    </button>

                    <button className="p-2 text-gray-600 hover:text-[#FF9244] transition-colors relative" aria-label="Cart">
                        <ShoppingBag size={20} />
                        {/* Orange Cart Badge */}
                        <span className="absolute top-1 right-1 bg-[#FF9244] text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button className="p-2 text-gray-600 md:hidden hover:text-[#FF9244]">
                        <Menu size={20} />
                    </button>
                </div>

            </div>
        </header>
    );
}