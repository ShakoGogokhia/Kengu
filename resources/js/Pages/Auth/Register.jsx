import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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

            <main className="relative overflow-hidden bg-gradient-to-r from-gray-50 to-orange-50/40 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <section>
                        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#FF9244]">
                            <Sparkles size={14} />
                            შემოგვიერთდი Kengu-ს
                        </span>
                        <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            შექმენი შენი Kengu ანგარიში
                        </h1>
                        <p className="mb-8 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
                            დარეგისტრირდი ერთხელ და მარტივად მართე ფავორიტი ჩანთები, პროფილი და მომავალი შეკვეთები.
                        </p>
                        <div className="relative flex justify-center lg:justify-start">
                            <div className="absolute inset-0 rotate-3 scale-95 rounded-3xl bg-gradient-to-tr from-orange-200 to-transparent opacity-30"></div>
                            <img
                                src="/images/641245818_17922988698260863_5902760952948628500_n.jpg"
                                alt="Kengu Premium Baby Carrier Bag"
                                className="relative max-h-[380px] w-auto rounded-2xl object-contain drop-shadow-2xl"
                            />
                        </div>
                    </section>

                    <section className="relative">
                        <div className="absolute inset-0 -rotate-2 scale-95 rounded-3xl bg-gradient-to-tr from-orange-200 to-transparent opacity-30"></div>
                        <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-2xl shadow-orange-200/30 sm:p-8">
                            <div className="mb-6 flex items-center gap-4 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#FF9244] shadow-sm">
                                    <HeartHandshake size={24} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-900">
                                        დაიწყე Kengu-სთან ერთად
                                    </h2>
                                    <p className="text-xs leading-relaxed text-gray-500">
                                        სწრაფი რეგისტრაცია კომფორტული შეძენის გამოცდილებისთვის.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="სახელი" />

                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
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

                                <div className="mt-4">
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

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="password_confirmation"
                                        value="გაიმეორე პაროლი"
                                    />

                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full border-orange-100 focus:border-[#FF9244] focus:ring-[#FF9244]"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData('password_confirmation', e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.password_confirmation}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-600 underline decoration-orange-200 underline-offset-4 transition-colors hover:text-[#FF9244] focus:outline-none focus:ring-2 focus:ring-[#FF9244] focus:ring-offset-2"
                                    >
                                        უკვე გაქვს ანგარიში?
                                    </Link>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF9244] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-[#e07f38] focus:outline-none focus:ring-2 focus:ring-[#FF9244] focus:ring-offset-2 disabled:opacity-50"
                                        disabled={processing}
                                    >
                                        რეგისტრაცია
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
