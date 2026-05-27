import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function HeroCarousel({ slides = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!slides || slides.length === 0) {
        return null;
    }

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide, slides.length]);

    return (
        <section className="relative h-[550px] w-full overflow-hidden bg-white sm:h-[650px]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    } ${slide.color || 'bg-white'}`}
                >
                    <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-12 px-6 md:flex-row">
                        {/* Text Content with Slide Animation */}
                        <div className={`flex flex-col items-center text-center transition-all duration-1000 delay-300 md:items-start md:text-left ${
                            index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                            <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#FF9244]">
                                ახალი კოლექცია
                            </span>
                            <h1 className="mb-6 text-5xl font-black tracking-tight text-gray-900 lg:text-8xl">
                                {slide.title}
                            </h1>
                            <p className="mb-10 max-w-md text-lg text-gray-600 sm:text-xl leading-relaxed">
                                {slide.subtitle}
                            </p>
                            <Link
                                href={route('products.index')}
                                className="inline-block rounded-2xl bg-[#FF9244] px-12 py-5 text-lg font-black text-white shadow-2xl shadow-orange-200 transition-all hover:bg-[#e88238] hover:scale-105 active:scale-95"
                            >
                                ნახე პროდუქცია
                            </Link>
                        </div>
                        
                        {/* Image with Scale Animation */}
                        <div className={`relative transition-all duration-1000 delay-500 ${
                            index === currentIndex ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
                        }`}>
                            <div className="absolute -inset-10 rounded-full bg-orange-100/60 blur-3xl animate-pulse" />
                            <img
                                src={slide.image_url || slide.image}
                                alt={slide.title}
                                className="relative z-10 h-[300px] w-auto object-contain transition-transform duration-[2000ms] hover:scale-110 lg:h-[500px]"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {slides.length > 1 && (
                <>
                    {/* Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-100 bg-white/80 p-4 text-gray-800 shadow-xl backdrop-blur-sm transition-all hover:bg-[#FF9244] hover:text-white sm:left-8"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gray-100 bg-white/80 p-4 text-gray-800 shadow-xl backdrop-blur-sm transition-all hover:bg-[#FF9244] hover:text-white sm:right-8"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Pagination Indicators */}
                    <div className="absolute bottom-12 left-1/2 z-20 flex -translate-x-1/2 gap-4">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 transition-all duration-500 rounded-full ${
                                    index === currentIndex ? 'w-12 bg-[#FF9244]' : 'w-3 bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
