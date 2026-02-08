import Placeholder from '@/components/Placeholder';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Privacy() {
    return (
        <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
            <Navbar />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>Privacy Policy</h1>
                <div style={{ color: '#ccc', lineHeight: '1.6' }}>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <br />
                    <h3>1. Introduction</h3>
                    <p>Welcome to DraftXo. We respect your privacy and are committed to protecting your personal data.</p>
                    <br />
                    <h3>2. Data We Collect</h3>
                    <p>We collect information you provide directly to us when you create an account, use our AI tools, or communicate with us.</p>
                    <br />
                    <h3>3. How We Use Your Data</h3>
                    <p>We use your data to provide, maintain, and improve our services, including generating project drafts and processing payments.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
