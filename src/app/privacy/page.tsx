import Navbar from '@/components/layout/Navbar';

export default function PrivacyPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 prose prose-slate">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to Med24 AI. We do not sell your personal or medical data. All AI inputs are securely transient or stored encrypted within HIPAA-compliant architecture definitions.</p>
            </div>
        </div>
    );
}
