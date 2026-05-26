import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Brand & Newsletter */}
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold tracking-widest text-white">KENGU GEORGIA</span>
          <p className="text-sm text-gray-400 leading-relaxed">
            Premium, durable, and stylish bags designed to carry your world comfortably—just like a kangaroo pouch.
          </p>
          {/* Simple Newsletter */}
          <div className="mt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Subscribe for Offers</label>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white px-3 py-2 text-sm rounded-l focus:outline-none w-full border border-transparent focus:border-[#FF9244]"
              />
              <button className="bg-[#FF9244] hover:bg-[#e07f38] text-white px-4 py-2 text-sm font-medium rounded-r transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Shop Categories</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#backpacks" className="hover:text-[#FF9244] transition-colors">Daily Backpacks</a></li>
            <li><a href="#travel" className="hover:text-[#FF9244] transition-colors">Travel & Duffels</a></li>
            <li><a href="#totes" className="hover:text-[#FF9244] transition-colors">Tote Bags</a></li>
            <li><a href="#accessories" className="hover:text-[#FF9244] transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Care */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#shipping" className="hover:text-[#FF9244] transition-colors">Shipping & Delivery</a></li>
            <li><a href="#returns" className="hover:text-[#FF9244] transition-colors">Returns & Exchanges</a></li>
            <li><a href="#faq" className="hover:text-[#FF9244] transition-colors">FAQs</a></li>
            <li><a href="#track" className="hover:text-[#FF9244] transition-colors">Track Your Order</a></li>
          </ul>
        </div>

        {/* Column 4: Location & Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 Tbilisi, Georgia</li>
            <li>📞 +995 5XX XX XX XX</li>
            <li>✉️ support@kengu.ge</li>
            <li className="pt-2 flex gap-3 text-white">
              {/* Simple text placeholders for Social Icons */}
              <a href="#fb" className="hover:text-[#FF9244]">FB</a>
              <a href="#ig" className="hover:text-[#FF9244]">IG</a>
              <a href="#tiktok" className="hover:text-[#FF9244]">TK</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Kengu Georgia Bags. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Visa / Mastercard</span>
          <span>Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
}