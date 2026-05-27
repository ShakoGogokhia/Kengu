import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="რეგისტრაცია" />
            <Header />

            <main className="bg-gradient-to-r from-gray-50 to-orange-50/40 py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
                        <h1 className="text-3xl font-black">რეგისტრაცია</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            ანგარიშის შექმნისას ტელეფონი და მისამართი სავალდებულოა შეკვეთებისთვის.
                        </p>

                        <form onSubmit={submit} className="mt-6 space-y-4">
                            <div>
                                <InputLabel htmlFor="name" value="სახელი" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    autoComplete="name"
                                    isFocused
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="ელფოსტა" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="ტელეფონი" />
                                <TextInput
                                    id="phone"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                <InputError message={errors.phone} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="address" value="მისამართი" />
                                <TextInput
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    onChange={(e) => setData('address', e.target.value)}
                                    required
                                />
                                <InputError message={errors.address} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="პაროლი" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="გაიმეორე პაროლი" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF9244] px-5 py-3 text-sm font-bold text-white hover:bg-[#e07f38] disabled:opacity-50"
                                    disabled={processing}
                                >
                                    რეგისტრაცია
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </form>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            უკვე გაქვს ანგარიში?{' '}
                            <Link href={route('login')} className="font-semibold text-[#FF9244] hover:underline">
                                შესვლა
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
