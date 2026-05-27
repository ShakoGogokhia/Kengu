import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Smile } from 'lucide-react';
import HeroCarousel from '@/Components/HeroCarousel';

export default function Welcome({ slides = [] }) {
    return (
        <div className="bg-white text-gray-900 min-h-screen">
            <Header />

            <main>
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
                {slides.length > 0 && <HeroCarousel slides={slides} />}

            </main>

            <Footer />
        </div>
    );
}
