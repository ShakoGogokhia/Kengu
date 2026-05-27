import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import InputError from '@/Components/InputError';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function AdminProductsIndex({ products }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: 0,
        images: [],
        is_active: true,
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.products.store'), {
            forceFormData: true,
            onSuccess: () => reset('name', 'category', 'description', 'price', 'stock', 'images'),
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="ადმინ პანელი" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm lg:col-span-1">
                        <h1 className="text-2xl font-black">ადმინ პანელი</h1>
                        <p className="mt-2 text-sm text-gray-600">დაამატე ახალი პროდუქტი კატეგორიით, ფასით და მარაგით.</p>

                        {flash?.success && (
                            <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
                                {flash.success}
                            </p>
                        )}

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <input
                                    placeholder="სახელი"
                                    value={data.name}
                                    onChange={(event) => setData('name', event.target.value)}
                                    className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                />
                                <InputError message={errors.name} className="mt-1" />
                            </div>
                            <div>
                                <input
                                    placeholder="კატეგორია"
                                    value={data.category}
                                    onChange={(event) => setData('category', event.target.value)}
                                    className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                />
                                <InputError message={errors.category} className="mt-1" />
                            </div>
                            <div>
                                <textarea
                                    placeholder="აღწერა"
                                    value={data.description}
                                    onChange={(event) => setData('description', event.target.value)}
                                    className="h-24 w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="ფასი"
                                        value={data.price}
                                        onChange={(event) => setData('price', event.target.value)}
                                        className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                    />
                                    <InputError message={errors.price} className="mt-1" />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="მარაგი"
                                        value={data.stock}
                                        onChange={(event) => setData('stock', event.target.value)}
                                        className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                    />
                                    <InputError message={errors.stock} className="mt-1" />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={(event) => setData('images', Array.from(event.target.files ?? []))}
                                    className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                />
                                <p className="mt-1 text-xs text-gray-500">შეგიძლია რამდენიმე სურათის ატვირთვა.</p>
                                <InputError message={errors.images} className="mt-1" />
                                <InputError message={errors['images.0']} className="mt-1" />
                            </div>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) => setData('is_active', event.target.checked)}
                                />
                                აქტიური პროდუქტი
                            </label>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-[#FF9244] px-4 py-3 text-sm font-bold text-white hover:bg-[#e07f38] disabled:opacity-50"
                            >
                                პროდუქტის დამატება
                            </button>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm lg:col-span-2">
                        <h2 className="text-xl font-black">არსებული პროდუქტები</h2>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-orange-100 text-gray-500">
                                        <th className="px-2 py-2">სახელი</th>
                                        <th className="px-2 py-2">კატეგორია</th>
                                        <th className="px-2 py-2">ფასი</th>
                                        <th className="px-2 py-2">მარაგი</th>
                                        <th className="px-2 py-2">სტატუსი</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b border-orange-50">
                                            <td className="px-2 py-3 font-medium text-gray-900">{product.name}</td>
                                            <td className="px-2 py-3 text-gray-600">{product.category}</td>
                                            <td className="px-2 py-3 text-gray-900">{Number(product.price).toFixed(2)} ₾</td>
                                            <td className="px-2 py-3 text-gray-600">{product.stock}</td>
                                            <td className="px-2 py-3">
                                                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                    {product.is_active ? 'აქტიური' : 'არააქტიური'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p className="py-8 text-center text-gray-500">პროდუქტები ჯერ არ არის დამატებული.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
