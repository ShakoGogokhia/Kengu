import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductsIndex({ products, categories, filters, favoriteProductIds, cartProductIds }) {
    const { auth } = usePage().props;

    const applyFilters = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        router.get(route('products.index'), {
            search: form.get('search') || '',
            category: form.get('category') || '',
            min_price: form.get('min_price') || '',
            max_price: form.get('max_price') || '',
            sort: form.get('sort') || 'newest',
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const addToCart = (productId) => {
        router.post(route('cart.add'), { product_id: productId }, { preserveScroll: true });
    };

    const toggleFavorite = (productId) => {
        router.post(route('favorites.toggle'), { product_id: productId }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="პროდუქტები" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">პროდუქტები</h1>
                        <p className="mt-2 text-sm text-gray-600">აირჩიე სასურველი პროდუქტი ფილტრებით, ფავორიტებით და კალათით.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                            <form onSubmit={applyFilters} className="space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700">ფილტრები</h2>
                                <input name="search" defaultValue={filters.search ?? ''} placeholder="ძებნა" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                <select name="category" defaultValue={filters.category ?? ''} className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]">
                                    <option value="">ყველა კატეგორია</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="grid grid-cols-2 gap-2">
                                    <input name="min_price" type="number" min="0" step="0.01" defaultValue={filters.min_price ?? ''} placeholder="მინ" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                    <input name="max_price" type="number" min="0" step="0.01" defaultValue={filters.max_price ?? ''} placeholder="მაქს" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                </div>
                                <select name="sort" defaultValue={filters.sort ?? 'newest'} className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]">
                                    <option value="newest">უახლესი</option>
                                    <option value="price_asc">ფასი ზრდადი</option>
                                    <option value="price_desc">ფასი კლებადი</option>
                                    <option value="name_asc">სახელი A-Z</option>
                                </select>
                                <button type="submit" className="w-full rounded-lg bg-[#FF9244] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e07f38]">
                                    ფილტრის გამოყენება
                                </button>
                            </form>
                        </aside>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.data.map((product) => {
                            const isFavorite = favoriteProductIds.includes(product.id);
                            const inCart = cartProductIds.includes(product.id);
                            const image = product.images?.[0]?.path || product.image_url;

                            return (
                                <article key={product.id} className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => auth.user ? toggleFavorite(product.id) : router.visit(route('login'))}
                                        className={`absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 transition-colors ${isFavorite ? 'border-pink-200 text-pink-600' : 'border-orange-100 text-gray-600 hover:border-[#FF9244] hover:text-[#FF9244]'}`}
                                    >
                                        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                                    </button>
                                    <Link href={route('products.show', product.id)}>
                                        {image ? (
                                            <img src={image} alt={product.name} className="h-52 w-full object-cover" />
                                        ) : (
                                            <div className="flex h-52 items-center justify-center bg-orange-50 text-sm text-orange-400">
                                                სურათი არ არის
                                            </div>
                                        )}
                                    </Link>
                                    <div className="p-4">
                                        <p className="text-xs font-semibold uppercase text-orange-500">{product.category}</p>
                                        <Link href={route('products.show', product.id)} className="mt-1 block text-lg font-bold text-gray-900 hover:text-[#FF9244]">
                                            {product.name}
                                        </Link>
                                        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-black text-gray-900">{Number(product.price).toFixed(2)} ₾</span>
                                            <span className="text-xs text-gray-500">მარაგი: {product.stock}</span>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                onClick={() => auth.user ? addToCart(product.id) : router.visit(route('login'))}
                                                className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-colors ${inCart ? 'bg-[#e07f38] hover:bg-[#cf7231]' : 'bg-[#FF9244] hover:bg-[#e07f38]'}`}
                                            >
                                                <ShoppingCart size={16} />
                                                {inCart ? 'კალათაში დამატებულია' : 'კალათაში'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                        </div>
                    </div>

                    {products.data.length === 0 && (
                        <p className="rounded-xl border border-orange-100 bg-white p-6 text-center text-gray-500">
                            პროდუქტები ვერ მოიძებნა.
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-2">
                        {products.links.map((link, index) => (
                            <Link
                                key={`${link.url}-${index}`}
                                href={link.url || '#'}
                                preserveScroll
                                preserveState
                                className={`rounded-md px-3 py-2 text-sm ${link.active ? 'bg-[#FF9244] text-white' : 'border border-orange-100 bg-white text-gray-600'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
