import { LabTest } from '@/lib/types';

export default function LabResultCard({ result }: { result: LabTest }) {
    const isNormal = result.flag === 'NORMAL';
    const isHigh = result.flag === 'HIGH';
    const isLow = result.flag === 'LOW';
    const isCritical = result.flag === 'CRITICAL';

    let statusColor = 'text-green-600 bg-green-50 border-green-200';
    let badgeText = 'Normal';

    if (isHigh) {
        statusColor = 'text-amber-600 bg-amber-50 border-amber-200';
        badgeText = 'High';
    } else if (isLow) {
        statusColor = 'text-blue-600 bg-blue-50 border-blue-200';
        badgeText = 'Low';
    } else if (isCritical) {
        statusColor = 'text-red-600 bg-red-50 border-red-200';
        badgeText = 'Critical';
    }

    // Visual Bar Marker Position
    let markerPosition = 'left-1/2'; // default center (Normal)
    if (isLow) markerPosition = 'left-1/6';
    if (isHigh) markerPosition = 'left-5/6';
    if (isCritical) markerPosition = 'left-[95%]';

    return (
        <div className={`p-5 rounded-2xl border ${statusColor} transition-all hover:shadow-md bg-white`}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-lg">{result.test}</h4>
                    <span className="text-xs text-slate-500 font-medium tracking-wide">Ref Range: {result.range}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border bg-white shadow-sm ${statusColor}`}>
                    {badgeText}
                </div>
            </div>

            <div className="flex items-end gap-2 mb-4">
                <span className={`text-3xl font-black ${isNormal ? 'text-slate-800' : 'text-inherit'}`}>
                    {result.value}
                </span>
                <span className="text-sm text-slate-500 font-medium pb-1">{result.unit}</span>
            </div>

            {/* Visual Range Indicator */}
            <div className="relative w-full h-8 mt-6">
                {/* Segment Backgrounds */}
                <div className="absolute inset-0 flex items-center justify-between w-full h-2 rounded-full overflow-hidden bg-slate-100">
                    <div className={`h-full w-1/3 ${isLow ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-full w-1/3 ${isNormal ? 'bg-green-400' : 'bg-slate-200'}`}></div>
                    <div className={`h-full w-1/3 ${isHigh || isCritical ? 'bg-red-400' : 'bg-slate-200'}`}></div>
                </div>

                {/* Segments Text */}
                <div className="absolute top-3 w-full flex justify-between px-2 text-[10px] sm:text-xs text-slate-400 font-medium">
                    <span>Low</span>
                    <span className="text-center">Normal</span>
                    <span>High</span>
                </div>

                {/* The value marker */}
                <div
                    className="absolute top-[-4px] w-4 h-4 rounded-full bg-white border-2 border-slate-800 shadow-sm transition-all duration-500"
                    style={{
                        left: isLow ? '16.6%' : isNormal ? '50%' : '83.3%',
                        transform: 'translateX(-50%)'
                    }}
                />
            </div>
        </div>
    );
}
