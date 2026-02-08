import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Placeholder({ title }) {
    return (
        <main style={{ minHeight: '100vh', paddingTop: '100px', textAlign: 'center' }}>
            <Navbar />
            <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '20px' }}>{title}</h1>
            <p style={{ color: '#aaa' }}>This page is coming soon.</p>
            <Footer />
        </main>
    );
}
