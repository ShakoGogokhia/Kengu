import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}