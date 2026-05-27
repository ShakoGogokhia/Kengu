import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, router, usePage } from '@inertiajs/react';

export default function AdminOrdersIndex({ orders = [] }) {
    const { flash } = usePage().props;

    const acceptOrder = (orderId) => {
        router.post(route('admin.orders.accept', orderId));
    };

    const declineOrder = (orderId) => {
        const note = window.prompt('Decline reason (optional):', '');
        if (note === null) return;

        router.post(route('admin.orders.decline', orderId), {
            admin_note: note,
        });
    };

    const statusClass = (status) => {
        if (status === 'accepted') return 'bg-green-100 text-green-700';
        if (status === 'declined') return 'bg-red-100 text-red-700';
        return 'bg-amber-100 text-amber-700';
    };

    return (
        <div className="min-h-screen bg-[#fffaf6] text-gray-900">
            <Head title="ადმინი - შეკვეთები" />
            <Header />

            <main className="py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-black">შეკვეთების მართვა</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        ნახე მომხმარებლის ინფორმაცია, შეკვეთილი პროდუქტები და გადახდის დეტალები.
                    </p>

                    {flash?.success && (
                        <div className="mt-4 rounded-lg border border-green-100 bg-green-50 px-4 py-2 text-sm text-green-700">
                            {flash.success}
                        </div>
                    )}

                    <div className="mt-6 space-y-4">
                        {orders.map((order) => (
                            <article key={order.id} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm text-gray-500">შეკვეთა #{order.id}</p>
                                        <p className="text-xl font-black text-gray-900">{Number(order.total).toFixed(2)} GEL</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-xl bg-orange-50/60 p-4">
                                        <h2 className="text-sm font-bold text-gray-800">მომხმარებლის ინფორმაცია</h2>
                                        <p className="mt-2 text-sm text-gray-700">სახელი: {order.customer_name}</p>
                                        <p className="text-sm text-gray-700">ელფოსტა: {order.customer_email}</p>
                                        <p className="text-sm text-gray-700">ტელეფონი: {order.customer_phone}</p>
                                        <p className="text-sm text-gray-700">მისამართი: {order.shipping_address}</p>
                                    </div>

                                    <div className="rounded-xl bg-orange-50/60 p-4">
                                        <h2 className="text-sm font-bold text-gray-800">გადახდის დეტალები</h2>
                                        <p className="mt-2 text-sm text-gray-700">ბარათის მფლობელი: {order.payment_cardholder_name}</p>
                                        <p className="text-sm text-gray-700">ბარათი: **** **** **** {order.payment_last_four}</p>
                                        {order.admin_note && <p className="mt-2 text-sm text-red-600">შენიშვნა: {order.admin_note}</p>}
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

                                {order.status === 'pending' && (
                                    <div className="mt-5 flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => acceptOrder(order.id)}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => declineOrder(order.id)}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
