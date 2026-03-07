export default function EmergencyAlert({ isEmergency }: { isEmergency?: boolean }) {
    if (!isEmergency) return null;

    return (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 shadow-sm animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <span className="text-xl">🚨</span>
                </div>
                <div>
                    <h4 className="text-red-800 font-bold text-sm">Critical Symptoms Detected</h4>
                    <p className="text-red-600 text-xs mt-1 leading-relaxed">
                        Your inquiry mentions symptoms that may require urgent medical attention. Do not rely solely on this AI assistant.
                    </p>
                </div>
            </div>
            <div className="mt-4 pt-3 border-t border-red-100">
                <a
                    href="tel:112"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call Emergency (112)
                </a>
            </div>
        </div>
    );
}
