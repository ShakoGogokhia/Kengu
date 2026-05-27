import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

export default function CheckoutIndex({ items = [], paymentMethods = [] }) {
    const addCardForm = useForm({
        cardholder_name: '',
        card_number: '',
        exp_month: '',
        exp_year: '',
        is_default: paymentMethods.length === 0,
    });

    const payForm = useForm({
        payment_method_id: paymentMethods.find((method) => method.is_default)?.id ?? paymentMethods[0]?.id ?? '',
    });

    const total = items.reduce((sum, item) => sum + Number(item.product?.price ?? 0) * Number(item.quantity ?? 0), 0);

    const saveCard = (event) => {
        event.preventDefault();
        addCardForm.post(route('checkout.payment-method.store'));
    };

    const payNow = (event) => {
        event.preventDefault();
        payForm.post(route('checkout.pay'));
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="გადახდა" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-10">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                    <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                        <h1 className="text-3xl font-black">გადახდა</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            დაამატე ბარათი უსაფრთხოდ, შეინახე ანგარიშზე და დაასრულე ყიდვა.
                        </p>

                        <form onSubmit={saveCard} className="mt-6 space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">ბარათის მფლობელი</label>
                                <input
                                    value={addCardForm.data.cardholder_name}
                                    onChange={(event) => addCardForm.setData('cardholder_name', event.target.value)}
                                    className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                    placeholder="სახელი და გვარი"
                                />
                                <InputError message={addCardForm.errors.cardholder_name} className="mt-1" />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">ბარათის ნომერი</label>
                                <input
                                    value={addCardForm.data.card_number}
                                    onChange={(event) => addCardForm.setData('card_number', event.target.value)}
                                    className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                    placeholder="4242 4242 4242 4242"
                                />
                                <InputError message={addCardForm.errors.card_number} className="mt-1" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">ვადა (თვე)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={addCardForm.data.exp_month}
                                        onChange={(event) => addCardForm.setData('exp_month', event.target.value)}
                                        className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                        placeholder="MM"
                                    />
                                    <InputError message={addCardForm.errors.exp_month} className="mt-1" />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">ვადა (წელი)</label>
                                    <input
                                        type="number"
                                        min={new Date().getFullYear()}
                                        max={new Date().getFullYear() + 20}
                                        value={addCardForm.data.exp_year}
                                        onChange={(event) => addCardForm.setData('exp_year', event.target.value)}
                                        className="w-full rounded-lg border border-orange-100 px-3 py-2 text-sm focus:border-[#FF9244] focus:outline-none focus:ring-1 focus:ring-[#FF9244]"
                                        placeholder="YYYY"
                                    />
                                    <InputError message={addCardForm.errors.exp_year} className="mt-1" />
                                </div>
                            </div>

                            <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                                <input
                                    type="checkbox"
                                    checked={addCardForm.data.is_default}
                                    onChange={(event) => addCardForm.setData('is_default', event.target.checked)}
                                />
                                ნაგულისხმევ ბარათად დაყენება
                            </label>

                            <button
                                type="submit"
                                disabled={addCardForm.processing}
                                className="inline-flex rounded-lg bg-[#FF9244] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e07f38] disabled:opacity-60"
                            >
                                {addCardForm.processing ? 'ინახება...' : 'ბარათის შენახვა'}
                            </button>
                        </form>

                        <div className="mt-8">
                            <h2 className="text-lg font-black">შენახული ბარათები</h2>
                            {paymentMethods.length === 0 ? (
                                <p className="mt-2 text-sm text-gray-500">შენახული ბარათი ჯერ არ გაქვს.</p>
                            ) : (
                                <form onSubmit={payNow} className="mt-3 space-y-3">
                                    {paymentMethods.map((method) => (
                                        <label key={method.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-orange-100 p-3">
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    •••• •••• •••• {method.last_four}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {method.cardholder_name} · {method.exp_month}/{method.exp_year}
                                                </p>
                                            </div>
                                            <input
                                                type="radio"
                                                name="payment_method_id"
                                                value={method.id}
                                                checked={String(payForm.data.payment_method_id) === String(method.id)}
                                                onChange={() => payForm.setData('payment_method_id', method.id)}
                                            />
                                        </label>
                                    ))}
                                    <InputError message={payForm.errors.payment_method_id} className="mt-1" />
                                    <button
                                        type="submit"
                                        disabled={payForm.processing || !payForm.data.payment_method_id || items.length === 0}
                                        className="inline-flex rounded-lg bg-[#FF9244] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e07f38] disabled:opacity-60"
                                    >
                                        {payForm.processing ? 'მუშავდება...' : 'გადახდა ახლა'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>

                    <aside className="h-fit rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-black">შეკვეთის შეჯამება</h2>
                        <div className="mt-4 space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                                    <p className="line-clamp-1 text-gray-700">
                                        {item.product?.name} × {item.quantity}
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {(Number(item.product?.price ?? 0) * Number(item.quantity)).toFixed(2)} GEL
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 border-t border-orange-100 pt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">ჯამი</span>
                                <span className="text-2xl font-black text-[#FF9244]">{total.toFixed(2)} GEL</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
