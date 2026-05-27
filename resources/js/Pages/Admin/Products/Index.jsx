import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    BadgePlus,
    Box,
    Image as ImageIcon,
    Pencil,
    Search,
    ShieldCheck,
    Trash2,
    PackageSearch,
    X,
} from 'lucide-react';

const initialProductForm = {
    name: '',
    category: '',
    description: '',
    price: '',
    stock: 0,
    images: [],
    remove_image_ids: [],
    is_active: 1,
};

const formatCurrency = (value) => `${Number(value || 0).toFixed(2)} GEL`;

function ProductFormFields({ data, setData, errors, mode = 'create' }) {
    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">პროდუქტის სახელი</label>
                    <input
                        value={data.name}
                        onChange={(event) => setData('name', event.target.value)}
                        className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="შეიყვანე პროდუქტის სახელი"
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">კატეგორია</label>
                    <input
                        value={data.category}
                        onChange={(event) => setData('category', event.target.value)}
                        className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="მაგ: ჩანთა, აქსესუარი, სამგზავრო"
                    />
                    <InputError message={errors.category} className="mt-1" />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">აღწერა</label>
                <textarea
                    value={data.description}
                    onChange={(event) => setData('description', event.target.value)}
                    className="h-28 w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="დაწერე პროდუქტის მოკლე აღწერა"
                />
                <InputError message={errors.description} className="mt-1" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">ფასი</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={data.price}
                        onChange={(event) => setData('price', event.target.value)}
                        className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="0.00"
                    />
                    <InputError message={errors.price} className="mt-1" />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">მარაგი</label>
                    <input
                        type="number"
                        min="0"
                        value={data.stock}
                        onChange={(event) => setData('stock', event.target.value)}
                        className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="0"
                    />
                    <InputError message={errors.stock} className="mt-1" />
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    {mode === 'edit' ? 'ახალი სურათების დამატება' : 'პროდუქტის სურათები'}
                </label>
                <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => setData('images', Array.from(event.target.files ?? []))}
                    className="w-full rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 px-4 py-3 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <p className="mt-2 text-xs text-gray-500">
                    {mode === 'edit'
                        ? 'ატვირთული ახალი სურათები დაემატება არსებულ გალერიას, თუ ქვემოთ წასაშლელად არ მონიშნავ.'
                        : 'შეგიძლია ერთზე მეტი პროდუქტის სურათი ატვირთო.'}
                </p>
                <InputError message={errors.images} className="mt-1" />
                <InputError message={errors['images.0']} className="mt-1" />
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50/50 px-4 py-3 text-sm font-medium text-gray-700">
                <input
                    type="checkbox"
                    checked={Boolean(data.is_active)}
                    onChange={(event) => setData('is_active', event.target.checked ? 1 : 0)}
                    className="rounded border-orange-200 text-[#FF9244] focus:ring-[#FF9244]"
                />
                პროდუქტი აქტიურია და მაღაზიაში გამოჩნდება
            </label>
            <InputError message={errors.is_active} className="mt-1" />
        </div>
    );
}

export default function AdminProductsIndex({ products }) {
    const { flash } = usePage().props;
    const [query, setQuery] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    const createForm = useForm(initialProductForm);
    const editForm = useForm(initialProductForm);

    const filteredProducts = (() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return products;
        }

        return products.filter((product) =>
            [product.name, product.category, product.description]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(normalizedQuery))
        );
    })();

    const activeCount = products.filter((product) => product.is_active).length;
    const totalStock = products.reduce((sum, product) => sum + Number(product.stock || 0), 0);
    const totalImages = products.reduce((sum, product) => sum + (product.images?.length || 0), 0);

    const stats = [
        { label: 'სულ პროდუქტები', value: products.length, icon: Box },
        { label: 'აქტიური ახლა', value: activeCount, icon: ShieldCheck },
        { label: 'მარაგის ერთეულები', value: totalStock, icon: PackageSearch },
        { label: 'ატვირთული სურათები', value: totalImages, icon: ImageIcon },
    ];

    const currentVisibleImages = editingProduct?.images?.filter(
        (image) => !editForm.data.remove_image_ids.includes(image.id)
    ) ?? [];

    const submitCreate = (event) => {
        event.preventDefault();
        createForm.transform((data) => ({
            ...data,
            is_active: data.is_active ? 1 : 0,
        }));

        createForm.post(route('admin.products.store'), {
            forceFormData: true,
            onSuccess: () => createForm.reset(),
            onFinish: () => createForm.transform((data) => data),
        });
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        editForm.setData({
            name: product.name ?? '',
            category: product.category ?? '',
            description: product.description ?? '',
            price: product.price ?? '',
            stock: product.stock ?? 0,
            images: [],
            remove_image_ids: [],
            is_active: product.is_active ? 1 : 0,
        });
        editForm.clearErrors();
    };

    const closeEditModal = () => {
        setEditingProduct(null);
        editForm.reset();
        editForm.clearErrors();
    };

    const toggleImageRemoval = (imageId) => {
        const selected = editForm.data.remove_image_ids;

        editForm.setData(
            'remove_image_ids',
            selected.includes(imageId)
                ? selected.filter((id) => id !== imageId)
                : [...selected, imageId]
        );
    };

    const submitEdit = (event) => {
        event.preventDefault();

        if (!editingProduct) {
            return;
        }

        editForm.transform((data) => ({
            ...data,
            _method: 'put',
            is_active: data.is_active ? 1 : 0,
        }));

        editForm.post(route('admin.products.update', editingProduct.id), {
            forceFormData: true,
            onSuccess: () => closeEditModal(),
            onFinish: () => editForm.transform((data) => data),
        });
    };

    const deleteProduct = (product) => {
        if (!window.confirm(`წავშალოთ "${product.name}"? ეს მოქმედება შეუქცევადია.`)) {
            return;
        }

        router.delete(route('admin.products.destroy', product.id));
    };

    return (
        <div className="min-h-screen bg-[#fffaf6] text-gray-900">
            <Head title="პროდუქტების ადმინისტრირება" />
            <Header />

            <main className="relative overflow-hidden py-10 sm:py-12">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-[-6rem] top-20 h-52 w-52 rounded-full bg-orange-200/30 blur-3xl" />
                    <div className="absolute right-[-5rem] top-40 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <section className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,244,235,0.92))] p-6 shadow-[0_30px_80px_-30px_rgba(171,95,24,0.3)] sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-bold tracking-[0.28em] text-[#FF9244]">
                                    <BadgePlus size={14} />
                                    პროდუქტების მართვა
                                </div>
                                <h1 className="mt-4 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                                    მართე პროდუქტები 
                                </h1>
                               
                            </div>

                            <div className="grid grid-cols-2 gap-3 lg:min-w-[420px]">
                                {stats.map((stat) => {
                                    const Icon = stat.icon;

                                    return (
                                        <div key={stat.label} className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
                                                <Icon size={18} className="text-[#FF9244]" />
                                            </div>
                                            <p className="mt-3 text-2xl font-black text-gray-900">{stat.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {flash?.success && (
                        <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
                        <section className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900">პროდუქტის დამატება</h2>
                                    <p className="mt-1 text-sm text-gray-500">შექმენი ახალი პროდუქტი სურათებითა და მარაგის ინფორმაციით.</p>
                                </div>
                                <div className="rounded-2xl bg-orange-50 p-3 text-[#FF9244]">
                                    <BadgePlus size={22} />
                                </div>
                            </div>

                            <form onSubmit={submitCreate} className="mt-6">
                                <ProductFormFields
                                    data={createForm.data}
                                    setData={createForm.setData}
                                    errors={createForm.errors}
                                />

                                <button
                                    type="submit"
                                    disabled={createForm.processing}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#FF9244] px-5 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_-18px_rgba(255,146,68,0.8)] transition hover:bg-[#e88238] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {createForm.processing ? 'ინახება...' : 'პროდუქტის დამატება'}
                                </button>
                            </form>
                        </section>

                        <section className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-gray-900">კატალოგის მიმოხილვა</h2>
                                    <p className="mt-1 text-sm text-gray-500">დაათვალიერე, დაარედაქტირე და წაშალე არსებული პროდუქტები უფრო კარგი ვიზუალით.</p>
                                </div>

                                <div className="relative w-full max-w-md">
                                    <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="ძებნა სახელით, კატეგორიით ან აღწერით"
                                        className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 py-3 pl-11 pr-4 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-2 focus:ring-orange-200"
                                    />
                                </div>
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div className="mt-8 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/40 px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#FF9244] shadow-sm">
                                        <PackageSearch size={24} />
                                    </div>
                                    <h3 className="mt-4 text-lg font-black text-gray-900">პროდუქტები ვერ მოიძებნა</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {products.length === 0
                                            ? 'კატალოგი ჯერ ცარიელია. დაამატე პირველი პროდუქტი ფორმიდან.'
                                            : 'სცადე სხვა საძიებო სიტყვა, რომ პროდუქტი სწრაფად იპოვო.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-8 grid gap-5 md:grid-cols-2">
                                    {filteredProducts.map((product) => {
                                        const primaryImage = product.image_url || product.images?.[0]?.path || null;

                                        return (
                                            <article
                                                key={product.id}
                                                className="group overflow-hidden rounded-[2rem] border border-orange-100 bg-[linear-gradient(180deg,#ffffff_0%,#fffaf6_100%)] shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(171,95,24,0.4)]"
                                            >
                                                <div className="relative h-56 overflow-hidden bg-[linear-gradient(135deg,#fff2e6_0%,#fffaf7_100%)]">
                                                    {primaryImage ? (
                                                        <img
                                                            src={primaryImage}
                                                            alt={product.name}
                                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center text-gray-400">
                                                            <ImageIcon size={36} />
                                                        </div>
                                                    )}
                                                    <div className="absolute left-4 top-4 flex items-center gap-2">
                                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold tracking-[0.24em] text-[#FF9244] shadow-sm">
                                                            {product.category}
                                                        </span>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                                            {product.is_active ? 'აქტიური' : 'დამალული'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-5">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div>
                                                            <h3 className="text-lg font-black text-gray-900">{product.name}</h3>
                                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                                                                {product.description || 'აღწერა ჯერ დამატებული არ არის.'}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xl font-black text-gray-900">{formatCurrency(product.price)}</p>
                                                            <p className="mt-1 text-xs tracking-[0.22em] text-gray-400">ფასი</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 grid grid-cols-3 gap-3">
                                                        <div className="rounded-2xl bg-orange-50/70 px-3 py-3">
                                                            <p className="text-xs font-semibold tracking-[0.22em] text-gray-400">მარაგი</p>
                                                            <p className="mt-1 text-base font-black text-gray-900">{product.stock}</p>
                                                        </div>
                                                        <div className="rounded-2xl bg-orange-50/70 px-3 py-3">
                                                            <p className="text-xs font-semibold tracking-[0.22em] text-gray-400">სურათები</p>
                                                            <p className="mt-1 text-base font-black text-gray-900">{product.images?.length || 0}</p>
                                                        </div>
                                                        <div className="rounded-2xl bg-orange-50/70 px-3 py-3">
                                                            <p className="text-xs font-semibold tracking-[0.22em] text-gray-400">ID</p>
                                                            <p className="mt-1 text-base font-black text-gray-900">#{product.id}</p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => openEditModal(product)}
                                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-bold text-gray-800 transition hover:border-[#FF9244] hover:text-[#FF9244]"
                                                        >
                                                            <Pencil size={16} />
                                                            რედაქტირება
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteProduct(product)}
                                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                                                        >
                                                            <Trash2 size={16} />
                                                            წაშლა
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>

            <Modal show={Boolean(editingProduct)} onClose={closeEditModal} maxWidth="2xl">
                <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-2xl font-black text-gray-900">პროდუქტის რედაქტირება</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                განაახლე ინფორმაცია, მონიშნე წასაშლელი სურათები და დაამატე ახალი სურათები არსებულ გალერიაში.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={closeEditModal}
                            className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="mt-5 rounded-[1.5rem] border border-orange-100 bg-orange-50/40 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">არსებული სურათები</h4>
                                <p className="mt-1 text-xs text-gray-500">
                                    დააჭირე სურათს წასაშლელად მონიშვნისთვის. ხელახლა დაჭერით მონიშვნა მოიხსნება.
                                </p>
                            </div>
                            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#FF9244]">
                                დარჩება: {currentVisibleImages.length}
                            </div>
                        </div>

                        {editingProduct && editingProduct.images?.length > 0 ? (
                            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {editingProduct.images.map((image) => {
                                    const markedForRemoval = editForm.data.remove_image_ids.includes(image.id);

                                    return (
                                        <button
                                            key={image.id}
                                            type="button"
                                            onClick={() => toggleImageRemoval(image.id)}
                                            className={`relative overflow-hidden rounded-2xl border text-left transition ${
                                                markedForRemoval
                                                    ? 'border-red-300 ring-2 ring-red-200'
                                                    : 'border-white/70 hover:border-orange-200'
                                            }`}
                                        >
                                            <img
                                                src={image.path}
                                                alt={editingProduct.name}
                                                className={`h-28 w-full object-cover ${markedForRemoval ? 'opacity-40' : ''}`}
                                            />
                                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/55 px-3 py-2 text-xs font-semibold text-white">
                                                <span>{markedForRemoval ? 'მოიშლება' : 'შენარჩუნდება'}</span>
                                                <span>{markedForRemoval ? 'გაუქმება' : 'წაშლა'}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="mt-4 text-sm text-gray-500">ამ პროდუქტს სურათები ჯერ არ აქვს.</p>
                        )}
                        <InputError message={editForm.errors.remove_image_ids} className="mt-2" />
                    </div>

                    <form onSubmit={submitEdit} className="mt-6">
                        <ProductFormFields
                            data={editForm.data}
                            setData={editForm.setData}
                            errors={editForm.errors}
                            mode="edit"
                        />

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={closeEditModal}
                                className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                            >
                                გაუქმება
                            </button>
                            <button
                                type="submit"
                                disabled={editForm.processing}
                                className="inline-flex items-center justify-center rounded-2xl bg-[#FF9244] px-5 py-3 text-sm font-black text-white transition hover:bg-[#e88238] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {editForm.processing ? 'ცვლილებები ინახება...' : 'ცვლილებების შენახვა'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Footer />
        </div>
    );
}
