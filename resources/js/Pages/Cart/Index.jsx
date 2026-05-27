import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, router } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';

export default function CartIndex({ items }) {
    const removeItem = (productId) => {
        router.post(route('cart.remove'), { product_id: productId }, { preserveScroll: true });
    };

    const total = items.reduce((sum, item) => sum + Number(item.product?.price ?? 0) * item.quantity, 0);

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="კალათა" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-3xl font-black tracking-tight">კალათა</h1>

                    <div className="space-y-3">
                        {items.map((item) => {
                            const product = item.product;
                            if (!product) return null;
                            const image = product.images?.[0]?.path || product.image_url;
                            return (
                                <article key={item.id} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                                    <Link href={route('products.show', product.id)} className="shrink-0">
                                        {image ? (
                                            <img src={image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
                                        ) : (
                                            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-orange-50 text-xs text-orange-400">სურათი არ არის</div>
                                        )}
                                    </Link>
                                    <div className="min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h2 className="line-clamp-1 text-lg font-bold">{product.name}</h2>
                                                <p className="text-xs text-gray-500">{product.category}</p>
                                            </div>
                                            <button onClick={() => removeItem(product.id)} className="rounded-lg border border-orange-100 px-3 py-1.5 text-xs hover:border-[#FF9244] hover:text-[#FF9244]">
                                                წაშლა
                                            </button>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <p className="text-sm text-gray-600">რაოდენობა: <span className="font-semibold text-gray-900">{item.quantity}</span></p>
                                            <p className="text-sm text-gray-600">ერთ. ფასი: <span className="font-semibold text-gray-900">{Number(product.price).toFixed(2)} GEL</span></p>
                                            <p className="text-lg font-black text-[#FF9244]">{(Number(product.price) * item.quantity).toFixed(2)} GEL</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {items.length === 0 && (
                        <div className="rounded-xl border border-orange-100 bg-white p-8 text-center text-gray-500">
                            <ShoppingBag className="mx-auto mb-2 text-orange-300" size={22} />
                            კალათა ცარიელია.
                        </div>
                    )}

                    {items.length > 0 && (
                        <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">ჯამური ღირებულება</span>
                                <span className="text-2xl font-black">{total.toFixed(2)} GEL</span>
                            </div>
                            <Link
                                href={route('checkout.index')}
                                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-[#FF9244] px-4 py-3 text-sm font-bold text-white hover:bg-[#e07f38]"
                            >
                                ყიდვა ახლა
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
