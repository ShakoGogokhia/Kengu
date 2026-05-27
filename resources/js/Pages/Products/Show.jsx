import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, router, usePage } from '@inertiajs/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow({ product, isFavorite, isInCart }) {
    const { auth } = usePage().props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const images = product.images?.length ? product.images : [{ path: product.image_url }];
    const selectedImage = images[selectedIndex]?.path;

    const addToCart = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('cart.add'), { product_id: product.id }, { preserveScroll: true });
    };

    const toggleFavorite = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('favorites.toggle'), { product_id: product.id }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title={product.name} />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <section>
                        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                            {selectedImage ? (
                                <img src={selectedImage} alt={product.name} className="h-[420px] w-full object-cover" />
                            ) : (
                                <div className="flex h-[420px] items-center justify-center bg-orange-50 text-orange-400">სურათი არ არის</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="mt-3 grid grid-cols-5 gap-2">
                                {images.map((img, index) => (
                                    <button key={`${img.path}-${index}`} onClick={() => setSelectedIndex(index)} className={`overflow-hidden rounded-lg border ${selectedIndex === index ? 'border-[#FF9244]' : 'border-orange-100'}`}>
                                        <img src={img.path} alt={`${product.name} ${index + 1}`} className="h-16 w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase text-orange-500">{product.category}</p>
                        <h1 className="mt-2 text-3xl font-black">{product.name}</h1>
                        <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>
                        <p className="mt-6 text-3xl font-black">{Number(product.price).toFixed(2)} ₾</p>
                        <p className="mt-2 text-sm text-gray-500">მარაგი: {product.stock}</p>

                        <div className="mt-8 flex gap-3">
                            <button onClick={toggleFavorite} className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 ${isFavorite ? 'border-pink-200 bg-pink-50 text-pink-600' : 'border-orange-100 text-gray-700 hover:border-[#FF9244] hover:text-[#FF9244]'}`}>
                                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={addToCart} className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white ${isInCart ? 'bg-[#e07f38] hover:bg-[#cf7231]' : 'bg-[#FF9244] hover:bg-[#e07f38]'}`}>
                                <ShoppingCart size={17} />
                                {isInCart ? 'კალათაში დამატებულია' : 'კალათაში დამატება'}
                            </button>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
