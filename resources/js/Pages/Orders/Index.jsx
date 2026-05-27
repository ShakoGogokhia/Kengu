import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function OrdersIndex({ orders = [] }) {
    const statusClass = (value) => {
        if (value === 'accepted') return 'bg-green-100 text-green-700';
        if (value === 'declined') return 'bg-red-100 text-red-700';
        return 'bg-amber-100 text-amber-700';
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="ჩემი შეკვეთები" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-black">ჩემი შეკვეთები</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        აქ ნახავ გადახდის დეტალებს, გადახდილ თანხას და შეკვეთის სტატუსს.
                    </p>

                    {orders.length === 0 ? (
                        <div className="mt-6 rounded-2xl border border-orange-100 bg-white p-8 text-center text-gray-500">
                            შეკვეთები ჯერ არ გაქვს.
                        </div>
                    ) : (
                        <div className="mt-6 space-y-4">
                            {orders.map((order) => (
                                <article key={order.id} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-500">შეკვეთა #{order.id}</p>
                                            <p className="text-xl font-black text-[#FF9244]">{Number(order.total).toFixed(2)} GEL</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <div className="rounded-xl bg-orange-50/60 p-4">
                                            <h2 className="text-sm font-bold text-gray-800">გადახდის ინფორმაცია</h2>
                                            <p className="mt-2 text-sm text-gray-700">სტატუსი: <span className="font-semibold text-green-700">გადახდილია</span></p>
                                            <p className="text-sm text-gray-700">გადახდილი თანხა: <span className="font-semibold">{Number(order.total).toFixed(2)} GEL</span></p>
                                            <p className="text-sm text-gray-700">ბარათი: **** **** **** {order.payment_last_four}</p>
                                        </div>

                                        <div className="rounded-xl bg-orange-50/60 p-4">
                                            <h2 className="text-sm font-bold text-gray-800">მიწოდების ინფორმაცია</h2>
                                            <p className="mt-2 text-sm text-gray-700">სახელი: {order.customer_name}</p>
                                            <p className="text-sm text-gray-700">ტელეფონი: {order.customer_phone}</p>
                                            <p className="text-sm text-gray-700">მისამართი: {order.shipping_address}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-sm font-bold text-gray-800">შეკვეთილი პროდუქტები</h3>
                                        <div className="mt-2 space-y-2">
                                            {order.items?.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between rounded-lg border border-orange-100 px-3 py-2 text-sm">
                                                    <span>{item.product_name} × {item.quantity}</span>
                                                    <span className="font-semibold">{Number(item.line_total).toFixed(2)} GEL</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
