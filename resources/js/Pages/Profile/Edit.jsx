import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, orders = [] }) {
    const statusClass = (value) => {
        if (value === 'accepted') return 'bg-green-100 text-green-700';
        if (value === 'declined') return 'bg-red-100 text-red-700';
        return 'bg-amber-100 text-amber-700';
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="პროფილი" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <div className="mb-2">
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                            პროფილი
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            მართე შენი ანგარიშის ინფორმაცია, პაროლი და უსაფრთხოება.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-8">
                        <h2 className="text-xl font-black text-gray-900">შეკვეთების ისტორია</h2>
                        {orders.length === 0 ? (
                            <p className="mt-3 text-sm text-gray-500">შეკვეთები ჯერ არ გაქვს.</p>
                        ) : (
                            <div className="mt-4 space-y-4">
                                {orders.map((order) => (
                                    <article key={order.id} className="rounded-xl border border-orange-100 p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <p className="font-bold text-gray-900">შეკვეთა #{order.id}</p>
                                            <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">
                                            გადახდა: **** **** **** {order.payment_last_four}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            ჯამი: <span className="font-semibold text-gray-900">{Number(order.total).toFixed(2)} GEL</span>
                                        </p>
                                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                                            {order.items?.map((item) => (
                                                <p key={item.id}>
                                                    {item.product_name} × {item.quantity} — {Number(item.line_total).toFixed(2)} GEL
                                                </p>
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
