import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Head title="შესვლა" />
            <Header />

            <main className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-orange-50/40 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <section>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF9244]">
                            <LockKeyhole size={14} />
                            დაცული ანგარიში
                        </span>
                        <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            კეთილი დაბრუნება Kengu-ზე
                        </h1>
                        <p className="mb-8 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
                            შედი ანგარიშში, რომ მართო შენი პროფილი, ფავორიტები და შეკვეთები Kengu-ს თბილ გარემოში.
                        </p>
                        <div className="flex items-center gap-4 rounded-xl border border-orange-100 bg-white/80 p-4 shadow-sm">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF9244]">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    უსაფრთხო და მარტივი
                                </h2>
                                <p className="text-xs leading-relaxed text-gray-500">
                                    შენი Kengu ანგარიში ყველაფერს მზად დაგახვედრებს შემდეგი ვიზიტისთვის.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="relative">
                        <div className="absolute inset-0 rotate-3 scale-95 rounded-3xl bg-gradient-to-tr from-orange-200 to-transparent opacity-30"></div>
                        <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-2xl shadow-orange-200/30 sm:p-8">
                            {status && (
                                <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="email" value="ელფოსტა" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="პაროლი" />

                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-4 block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData('remember', e.target.checked)
                                            }
                                        />
                                        <span className="ms-2 text-sm text-gray-600">
                                            დამიმახსოვრე
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm font-medium text-gray-600 underline decoration-orange-200 underline-offset-4 transition-colors hover:text-[#FF9244] focus:outline-none focus:ring-2 focus:ring-[#FF9244] focus:ring-offset-2"
                                        >
                                            დაგავიწყდა პაროლი?
                                        </Link>
                                    )}

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF9244] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-[#e07f38] focus:outline-none focus:ring-2 focus:ring-[#FF9244] focus:ring-offset-2 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        შესვლა
                                        <ArrowRight size={18} />
                                    </button>
                                </div>

                                <p className="mt-6 text-center text-sm text-gray-500">
                                    ახალი ხარ Kengu-ზე?{' '}
                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-[#FF9244] hover:text-[#e07f38]"
                                    >
                                        ანგარიშის შექმნა
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
