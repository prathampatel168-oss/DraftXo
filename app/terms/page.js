import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Terms() {
    return (
        <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
            <Navbar />
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>Terms of Service</h1>
                <div style={{ color: '#ccc', lineHeight: '1.6' }}>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <br />
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using DraftXo, you agree to be bound by these Terms of Service.</p>
                    <br />
                    <h3>2. Use of AI Tools</h3>
                    <p>You agree to use our AI generation tools responsibly and not for any illegal or harmful purposes.</p>
                    <br />
                    <h3>3. Subscription & Payments</h3>
                    <p>Pricing plans are subject to change. Subscriptions automatically renew unless cancelled.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
