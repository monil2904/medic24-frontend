export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Med24 AI. All rights reserved.
                    <span className="block mt-1 text-xs text-gray-400">Not a substitute for professional medical advice.</span>
                </p>
            </div>
        </footer>
    );
}
