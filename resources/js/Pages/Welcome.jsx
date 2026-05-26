import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react'; 

export default function Welcome() {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            {/* 1. Your original Header Component */}
            <Header />

            {/* 2. The Main Page Content */}
            <main>
                {/* HERO SECTION */}
                <section className="relative bg-gradient-to-r from-gray-50 to-orange-50/40 py-16 sm:py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block bg-orange-100 text-[#FF9244] font-semibold text-xs tracking-wider uppercase px-3 py-1 rounded-full mb-4">
                                ახალი კოლექცია ✨
                            </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
                                კენგუს ჩანთა შექმნილია იმისთვის, რომ დედობა უფრო კომფორტული და სტილური გახადოს
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                                შენი პატარასთვის მაქსიმალური კომფორტი, შენთვის – თავისუფალი ხელები და სიმშვიდე 
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#shop" className="inline-flex justify-center items-center gap-2 bg-[#FF9244] hover:bg-[#e07f38] text-white px-8 py-4 rounded-lg font-medium transition-colors shadow-lg shadow-orange-500/20">
                                    კოლექციის დათვალიერება
                                    <ArrowRight size={18} />
                                </a>
                                <a href="#story" className="inline-flex justify-center items-center border border-gray-300 hover:border-gray-400 px-8 py-4 rounded-lg font-medium text-gray-700 transition-colors">
                                ჩვენს შესახებ
                                </a>
                            </div>
                        </div>
                        <div className="relative flex justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-transparent rounded-3xl transform rotate-3 scale-95 opacity-30"></div>
                            <img 
                                src="/images/641245818_17922988698260863_5902760952948628500_n.jpg" 
                                alt="Kengu Premium Baby Carrier Bag" 
                                className="relative rounded-2xl max-h-[450px] w-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </section>

                {/* PRODUCT FEATURES & TRUST BADGES */}
                <section className="py-12 bg-white border-y border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-[#FF9244]"><Smile size={24} /></div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">9 თვიდან 3 წლამდე</h3>
                                <p className="text-xs text-gray-500">იდეალურია ზრდის ეტაპზე</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-[#FF9244]"><ShieldCheck size={24} /></div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">5 – 20 კგ</h3>
                                <p className="text-xs text-gray-500">მყარი და უსაფრთხო საყრდენი</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-[#FF9244]"><Heart size={24} /></div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">ანატომიურად სწორი</h3>
                                <p className="text-xs text-gray-500">სწორი პოზიცია ხერხემლისთვის</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-[#FF9244]"><Sparkles size={24} /></div>
                            <div>
                                <h3 className="font-bold text-sm text-gray-900">რბილი ქსოვილები</h3>
                                <p className="text-xs text-gray-500">უმაღლესი ხარისხის მასალა</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CATEGORIES SECTION */}
                {/* <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">აღმოაჩინე კატეგორიები</h2>
                        <p className="text-gray-500 mt-2 text-sm">შეარჩიე საუკეთესო მოდელი შენი პატარასთვის</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer">
                            <img src="/path-to-images/backpacks.jpg" alt="Classic Baby Carriers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl mb-1">კლასიკური კენგურუ</h3>
                                <p className="text-gray-200 text-xs mb-4">ყოველდღიური კომფორტი</p>
                                <span className="text-sm font-semibold text-[#FF9244] flex items-center gap-1">ყიდვა <ArrowRight size={14} /></span>
                            </div>
                        </div>
                        <div className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer">
                            <img src="/path-to-images/totes.jpg" alt="Premium Carriers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl mb-1">პრემიუმ ერგო ჩანთები</h3>
                                <p className="text-gray-200 text-xs mb-4">ორგანული და სუნთქვადი ქსოვილი</p>
                                <span className="text-sm font-semibold text-[#FF9244] flex items-center gap-1">ყიდვა <ArrowRight size={14} /></span>
                            </div>
                        </div>
                        <div className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/5] cursor-pointer sm:col-span-2 lg:col-span-1">
                            <img src="/path-to-images/travel.jpg" alt="Travel Carriers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white font-bold text-xl mb-1">სამოგზაურო მოდელები</h3>
                                <p className="text-gray-200 text-xs mb-4">აქტიური მშობლებისთვის</p>
                                <span className="text-sm font-semibold text-[#FF9244] flex items-center gap-1">ყიდვა <ArrowRight size={14} /></span>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main>

            {/* 3. Your original Footer Component */}
            {/* <Footer /> */}
        </div>
    );
}