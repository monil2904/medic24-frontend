'use client';
import { ImagePlus, X } from 'lucide-react';
import { useRef } from 'react';

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
    selectedFile: File | null;
}

export default function ImageUpload({ onImageSelect, selectedFile }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onImageSelect(e.target.files[0]);
        }
    };

    return (
        <div className="relative flex-shrink-0">
            <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {selectedFile ? (
                <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-300 overflow-hidden shadow-sm flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={URL.createObjectURL(selectedFile)} alt="Thumb" className="w-full h-full object-cover" />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            onImageSelect(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-md hover:bg-red-600 transition-colors"
                    >
                        <X size={12} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-cyan-600 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-cyan-500"
                    title="Upload Medical Image"
                >
                    <ImagePlus size={20} />
                </button>
            )}
        </div>
    );
}
