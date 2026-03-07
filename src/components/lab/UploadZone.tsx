'use client';
import { AlertCircle, CheckCircle2, FileText, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadZoneProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
}

export default function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.includes('pdf') || file.type.includes('image')) {
                onFileSelect(file);
            } else {
                alert("Please upload a PDF or Image file.");
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`relative w-full border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-200 ease-in-out
        ${dragActive ? 'border-cyan-400 bg-cyan-50/50 scale-[1.02]' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-cyan-300'}
        ${isLoading ? 'opacity-50 pointer-events-none grayscale' : 'cursor-pointer'}
      `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,image/png,image/jpeg,image/jpg"
                onChange={handleChange}
                disabled={isLoading}
            />

            <div className="flex flex-col items-center justify-center space-y-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 shadow-sm 
          ${dragActive ? 'bg-cyan-100 text-cyan-600' : 'bg-white text-slate-400'}`}>
                    <UploadCloud size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 font-display">
                    {dragActive ? "Drop your lab report here" : "Upload Lab Report"}
                </h3>
                <p className="text-slate-500 max-w-sm">
                    Drag and drop your PDF or image here, or click to browse files.
                </p>
                <div className="flex items-center gap-4 mt-6 text-xs text-slate-400 font-medium uppercase tracking-wider">
                    <span className="flex items-center gap-1"><FileText size={14} /> PDF</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} /> PNG</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1"><AlertCircle size={14} /> JPEG</span>
                </div>
            </div>
        </div>
    );
}
