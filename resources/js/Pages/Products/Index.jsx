import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Heart, Loader2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function ProductsIndex({ products, categories, filters, favoriteProductIds }) {
    const { auth } = usePage().props;
    const [quantities, setQuantities] = useState({});
    const [addingProductId, setAddingProductId] = useState(null);
    const [pulseProductId, setPulseProductId] = useState(null);

    const applyFilters = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);

        router.get(
            route('products.index'),
            {
                search: form.get('search') || '',
                category: form.get('category') || '',
                min_price: form.get('min_price') || '',
                max_price: form.get('max_price') || '',
                sort: form.get('sort') || 'newest',
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const getQuantity = (productId) => quantities[productId] ?? 1;

    const setQuantity = (productId, nextQuantity) => {
        if (!Number.isFinite(nextQuantity)) {
            return;
        }

        const normalized = Math.max(1, Math.min(20, nextQuantity));
        setQuantities((prev) => ({ ...prev, [productId]: normalized }));
    };

    const addToCart = (productId) => {
        if (addingProductId !== null) {
            return;
        }

        setAddingProductId(productId);

        router.post(
            route('cart.add'),
            { product_id: productId, quantity: getQuantity(productId) },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setPulseProductId(productId);
                    setTimeout(() => setPulseProductId(null), 420);
                },
                onFinish: () => setAddingProductId(null),
            }
        );
    };

    const toggleFavorite = (productId) => {
        router.post(route('favorites.toggle'), { product_id: productId }, { preserveScroll: true });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="Products" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Products</h1>
                        <p className="mt-2 text-sm text-gray-600">Find products with filters, favorites, and cart support.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-2xl border border-orange-100 bg-white p-4 shadow-sm">
                            <form onSubmit={applyFilters} className="space-y-3">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-700">Filters</h2>
                                <input name="search" defaultValue={filters.search ?? ''} placeholder="Search" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                <select name="category" defaultValue={filters.category ?? ''} className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]">
                                    <option value="">All categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                                <div className="grid grid-cols-2 gap-2">
                                    <input name="min_price" type="number" min="0" step="0.01" defaultValue={filters.min_price ?? ''} placeholder="Min" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                    <input name="max_price" type="number" min="0" step="0.01" defaultValue={filters.max_price ?? ''} placeholder="Max" className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]" />
                                </div>
                                <select name="sort" defaultValue={filters.sort ?? 'newest'} className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]">
                                    <option value="newest">Newest</option>
                                    <option value="price_asc">Price ascending</option>
                                    <option value="price_desc">Price descending</option>
                                    <option value="name_asc">Name A-Z</option>
                                </select>
                                <button type="submit" className="w-full rounded-lg bg-[#FF9244] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e07f38]">
                                    Apply filters
                                </button>
                            </form>
                        </aside>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {products.data.map((product) => {
                                const isFavorite = favoriteProductIds.includes(product.id);
                                const image = product.images?.[0]?.path || product.image_url;
                                const quantity = getQuantity(product.id);
                                const isLoading = addingProductId === product.id;

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
                                                    No image
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
                                                <span className="text-lg font-black text-gray-900">{Number(product.price).toFixed(2)} GEL</span>
                                                <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                <div className="inline-flex items-center rounded-lg border border-orange-100 bg-white">
                                                    <button
                                                        type="button"
                                                        onClick={() => setQuantity(product.id, quantity - 1)}
                                                        disabled={isLoading || quantity <= 1}
                                                        className="px-3 py-1.5 text-base font-bold text-gray-600 hover:text-[#FF9244] disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="20"
                                                        value={quantity}
                                                        onChange={(event) => setQuantity(product.id, Number(event.target.value || 1))}
                                                        disabled={isLoading}
                                                        className="w-12 border-x border-orange-100 py-1.5 text-center text-sm font-semibold focus:outline-none"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setQuantity(product.id, quantity + 1)}
                                                        disabled={isLoading || quantity >= 20}
                                                        className="px-3 py-1.5 text-base font-bold text-gray-600 hover:text-[#FF9244] disabled:opacity-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => auth.user ? addToCart(product.id) : router.visit(route('login'))}
                                                    disabled={isLoading}
                                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
                                                        pulseProductId === product.id ? 'scale-[1.03]' : 'scale-100'
                                                    } bg-[#FF9244] hover:bg-[#e07f38]`}
                                                >
                                                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />}
                                                    {isLoading ? 'Adding...' : 'Add to cart'}
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
                            No products found.
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
