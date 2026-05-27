import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { Heart } from 'lucide-react';

export default function FavoritesIndex({ favorites }) {
    const removeFavorite = (productId) => {
        router.post(route('favorites.toggle'), { product_id: productId }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="ფავორიტები" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-3xl font-black tracking-tight">ფავორიტები</h1>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {favorites.map((favorite) => {
                            const product = favorite.product;
                            const image = product?.images?.[0]?.path || product?.image_url;
                            if (!product) return null;

                            return (
                                <article key={favorite.id} className="group overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                                    <Link href={route('products.show', product.id)}>
                                        {image ? (
                                            <img src={image} alt={product.name} className="h-52 w-full object-cover" />
                                        ) : (
                                            <div className="flex h-52 items-center justify-center bg-orange-50 text-sm text-orange-400">სურათი არ არის</div>
                                        )}
                                    </Link>
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold group-hover:text-[#FF9244]">{product.name}</h2>
                                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-black">{Number(product.price).toFixed(2)} ₾</span>
                                            <button onClick={() => removeFavorite(product.id)} className="rounded-full border border-pink-200 bg-pink-50 p-2 text-pink-600 hover:bg-pink-100">
                                                <Heart size={18} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {favorites.length === 0 && (
                        <p className="rounded-xl border border-orange-100 bg-white p-6 text-center text-gray-500">
                            ფავორიტებში ჯერ არაფერი გაქვს დამატებული.
                        </p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
