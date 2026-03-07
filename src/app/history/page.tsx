import Navbar from '@/components/layout/Navbar';

export default function HistoryPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">Chat History</h1>
                <div className="bg-white shadow rounded-2xl p-8 text-center border border-slate-100">
                    <p className="text-slate-500">Your chat history API is connected, but the UI for historical list view is still under construction.</p>
                </div>
            </div>
        </div>
    );
}
