import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, router, usePage } from '@inertiajs/react';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function ProductShow({ product, isFavorite }) {
    const { auth } = usePage().props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [cartPulse, setCartPulse] = useState(false);

    const images = product.images?.length ? product.images : [{ path: product.image_url }];
    const selectedImage = images[selectedIndex]?.path;

    const addToCart = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }

        if (isAddingToCart) {
            return;
        }

        setIsAddingToCart(true);

        router.post(
            route('cart.add'),
            { product_id: product.id, quantity },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setCartPulse(true);
                    setTimeout(() => setCartPulse(false), 420);
                },
                onFinish: () => setIsAddingToCart(false),
            }
        );
    };

    const toggleFavorite = () => {
        if (!auth.user) {
            router.visit(route('login'));
            return;
        }
        router.post(route('favorites.toggle'), { product_id: product.id }, { preserveScroll: true });
    };

    const updateQuantity = (nextQuantity) => {
        if (!Number.isFinite(nextQuantity)) {
            return;
        }

        setQuantity(Math.max(1, Math.min(20, nextQuantity)));
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
                                <div className="flex h-[420px] items-center justify-center bg-orange-50 text-orange-400">No image</div>
                            )}
                        </div>
                        {images.length > 1 && (
                            <div className="mt-3 grid grid-cols-5 gap-2">
                                {images.map((img, index) => (
                                    <button
                                        key={`${img.path}-${index}`}
                                        onClick={() => setSelectedIndex(index)}
                                        className={`overflow-hidden rounded-lg border ${selectedIndex === index ? 'border-[#FF9244]' : 'border-orange-100'}`}
                                    >
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
                        <p className="mt-6 text-3xl font-black">{Number(product.price).toFixed(2)} GEL</p>
                        <p className="mt-2 text-sm text-gray-500">Stock: {product.stock}</p>

                        <div className="mt-6">
                            <p className="mb-2 text-sm font-semibold text-gray-700">Quantity</p>
                            <div className="inline-flex items-center rounded-lg border border-orange-100 bg-white">
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(quantity - 1)}
                                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:text-[#FF9244]"
                                    disabled={isAddingToCart || quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={quantity}
                                    onChange={(event) => updateQuantity(Number(event.target.value || 1))}
                                    disabled={isAddingToCart}
                                    className="w-16 border-x border-orange-100 py-2 text-center text-sm font-semibold focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => updateQuantity(quantity + 1)}
                                    className="px-4 py-2 text-lg font-bold text-gray-600 hover:text-[#FF9244]"
                                    disabled={isAddingToCart || quantity >= 20}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={toggleFavorite}
                                className={`inline-flex items-center justify-center rounded-lg border px-4 py-3 ${isFavorite ? 'border-pink-200 bg-pink-50 text-pink-600' : 'border-orange-100 text-gray-700 hover:border-[#FF9244] hover:text-[#FF9244]'}`}
                            >
                                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <button
                                onClick={addToCart}
                                disabled={isAddingToCart}
                                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                                    cartPulse ? 'scale-[1.03]' : 'scale-100'
                                } bg-[#FF9244] hover:bg-[#e07f38]`}
                            >
                                {isAddingToCart ? <Loader2 size={17} className="animate-spin" /> : <ShoppingCart size={17} />}
                                {isAddingToCart ? 'Adding...' : 'Add to cart'}
                            </button>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
