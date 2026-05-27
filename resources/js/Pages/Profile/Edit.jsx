import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
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
                            className="max-w-xl"
                        />
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
