"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface ComparisonTest {
  test: string;
  value1: string | number;
  unit: string;
  range: string;
  flag1: string;
  value2: string | number | null;
  flag2: string | null;
  change: "improved" | "worsened" | "stable" | "no_data";
}

interface ComparisonResult {
  comparison: ComparisonTest[];
  summary: {
    total_tests_compared: number;
    improved: number;
    worsened: number;
    stable: number;
  };
  ai_interpretation: string;
  disclaimer: string;
}

export default function ComparePage() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState("");

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && ["application/pdf", "image/jpeg", "image/png"].includes(selectedFile.type)) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please select a valid PDF or image file");
    }
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError("Please upload both reports");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("report1", file1);
      formData.append("report2", file2);

      const response = await fetch("/api/v1/lab-report/compare", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to compare reports");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to compare reports");
    } finally {
      setLoading(false);
    }
  };

  const getChangeColor = (change: string) => {
    switch (change) {
      case "improved":
        return "bg-green-50";
      case "worsened":
        return "bg-red-50";
      case "stable":
        return "bg-slate-50";
      default:
        return "";
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "improved":
        return "📈";
      case "worsened":
        return "📉";
      case "stable":
        return "➡️";
      default:
        return "❓";
    }
  };

  const shareComparison = () => {
    if (!result) return;

    let text = `📊 Lab Report Comparison\n\n`;
    text += `Summary:\n`;
    text += `✅ Improved: ${result.summary.improved}\n`;
    text += `⚠️ Worsened: ${result.summary.worsened}\n`;
    text += `➡️ Stable: ${result.summary.stable}\n\n`;
    text += `View full analysis on Medic24 AI\n🌐 ${window.location.origin}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-6xl mx-auto px-5 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0F3460] mb-2 flex items-center gap-3">
              📊 Compare Lab Reports
            </h1>
            <p className="text-slate-500">
              Upload two lab reports to see side-by-side comparison and trends
            </p>
          </div>

          {/* Upload Section */}
          {!result && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Report 1 Upload */}
                <div>
                  <label className="block text-lg font-semibold text-[#0F3460] mb-4">
                    📄 Upload OLDER Report
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                    <input
                      type="file"
                      onChange={(e) => handleFileSelect(e, setFile1)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file1"
                    />
                    <label htmlFor="file1" className="cursor-pointer block">
                      <div className="text-4xl mb-2">📑</div>
                      <div className="font-semibold text-slate-600 mb-2">Click to upload or drag &amp; drop</div>
                      <div className="text-sm text-slate-400">PDF, JPG, or PNG</div>
                    </label>
                  </div>
                  {file1 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">✓ {file1.name}</span>
                        <button
                          onClick={() => setFile1(null)}
                          className="text-green-500 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Report 2 Upload */}
                <div>
                  <label className="block text-lg font-semibold text-[#0F3460] mb-4">
                    📄 Upload NEWER Report
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                    <input
                      type="file"
                      onChange={(e) => handleFileSelect(e, setFile2)}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file2"
                    />
                    <label htmlFor="file2" className="cursor-pointer block">
                      <div className="text-4xl mb-2">📑</div>
                      <div className="font-semibold text-slate-600 mb-2">Click to upload or drag &amp; drop</div>
                      <div className="text-sm text-slate-400">PDF, JPG, or PNG</div>
                    </label>
                  </div>
                  {file2 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-300 rounded-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-green-700">✓ {file2.name}</span>
                        <button
                          onClick={() => setFile2(null)}
                          className="text-green-500 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700">
                  {error}
                </div>
              )}

              {/* Compare Button */}
              <button
                onClick={handleCompare}
                disabled={!file1 || !file2 || loading}
                className="w-full py-3 bg-[#0F3460] hover:bg-blue-900 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold transition-colors"
              >
                {loading ? "Analyzing..." : "Compare Reports"}
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-4">
              <div className="h-32 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-64 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          )}

          {/* Results */}
          {result && !loading && (
            <div className="space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {result.summary.total_tests_compared}
                  </div>
                  <div className="text-sm text-slate-500">Tests Compared</div>
                </div>

                <div className="p-6 bg-green-50 rounded-2xl border border-green-300 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {result.summary.improved}
                  </div>
                  <div className="text-sm text-slate-500">Improved ↑</div>
                </div>

                <div className="p-6 bg-red-50 rounded-2xl border border-red-300 text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {result.summary.worsened}
                  </div>
                  <div className="text-sm text-slate-500">Worsened ↓</div>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <div className="text-3xl font-bold text-slate-600 mb-2">
                    {result.summary.stable}
                  </div>
                  <div className="text-sm text-slate-500">Stable →</div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left font-semibold text-[#0F3460]">Test</th>
                        <th className="px-4 py-3 text-left font-semibold text-[#0F3460]">Older Value</th>
                        <th className="px-4 py-3 text-center font-semibold text-[#0F3460]">Change</th>
                        <th className="px-4 py-3 text-left font-semibold text-[#0F3460]">Newer Value</th>
                        <th className="px-4 py-3 text-left font-semibold text-[#0F3460]">Reference Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.comparison.map((test, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-slate-100 ${getChangeColor(test.change)}`}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-700">{test.test}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              test.flag1 === "HIGH" ? "bg-red-100 text-red-700" :
                              test.flag1 === "LOW" ? "bg-blue-100 text-blue-700" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {test.value1} {test.unit}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="text-2xl">{getChangeIcon(test.change)}</span>
                          </td>
                          <td className="px-4 py-3">
                            {test.value2 ? (
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                test.flag2 === "HIGH" ? "bg-red-100 text-red-700" :
                                test.flag2 === "LOW" ? "bg-blue-100 text-blue-700" :
                                "bg-slate-100 text-slate-700"
                              }`}>
                                {test.value2} {test.unit}
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-xs">
                            {test.range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* AI Interpretation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-[#0F3460] mb-4">🤖 AI Analysis</h3>
                <div className="prose max-w-none text-slate-700">
                  <ReactMarkdown>{result.ai_interpretation}</ReactMarkdown>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-700 text-sm">
                ⚠️ {result.disclaimer}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={shareComparison}
                  className="flex-1 px-6 py-3 bg-[#0F3460] hover:bg-blue-900 text-white rounded-xl font-semibold transition-colors"
                >
                  📱 Share on WhatsApp
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setFile1(null);
                    setFile2(null);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold transition-colors"
                >
                  Compare Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
