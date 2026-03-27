 "use client";

import Navbar from "@/components/layout/Navbar";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type QueryType = "info" | "interactions" | "dosage" | "side_effects";

export default function MedicinePage() {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState("");
  const [queryType, setQueryType] = useState<QueryType>("info");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "alphabetical">("default");

  // Fetch common medicines
  useEffect(() => {
    const fetchCommonMedicines = async () => {
      try {
        const data = await api.get("/api/v1/medicine/common");
        setSuggestions(data.data.medicines || []);
      } catch (err) {
        console.error("Failed to fetch common", err);
      }
    };
    fetchCommonMedicines();
  }, []);

  // Filter suggestions based on search
  const filteredSuggestions = medicineSearch
    ? suggestions.filter((med) =>
        med.toLowerCase().includes(medicineSearch.toLowerCase())
      )
    : [];

  const handleLookup = async (
    medicine: string = medicineSearch,
    overrideQueryType?: QueryType
  ) => {
    if (!medicine.trim()) {
      setError("Please enter a medicine name");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const data = await api.post("/api/v1/medicine/lookup", {
        medicine_name: medicine,
        query_type: overrideQueryType ?? queryType,
      });

      setResponse(data.data.analysis || data.data.response || "");
      setCurrentMedicine(medicine);
      setMedicineSearch("");
    } catch (err: any) {
      setError(err.message || "Failed to fetch medicine information");
    } finally {
      setLoading(false);
    }
  };

  const quickSearchMedicines = [
    "Dolo 650",
    "Crocin",
    "Metformin",
    "Azithromycin",
    "Omeprazole",
  ];

  const sortedMedicines = [...suggestions].sort((a, b) => {
    if (sortOrder === "alphabetical") return a.localeCompare(b);
    return 0; // "default" keeps the initial order from backend
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-[72px] flex">
        {/* Sidebar History */}
        <div className="hidden md:flex w-72 bg-slate-50 border-r border-slate-200 h-[calc(100vh-72px)] flex-col flex-shrink-0 sticky top-[72px]">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              Browse Medicines
            </h2>
            <button 
              onClick={() => setSortOrder(prev => prev === "default" ? "alphabetical" : "default")}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2 py-1 rounded"
              title="Toggle Sort"
            >
              {sortOrder === "default" ? "📌 Default" : "🔤 A-Z"}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {sortedMedicines.length === 0 ? (
              <p className="text-sm text-center text-slate-400 mt-10">Loading medicines...</p>
            ) : (
              sortedMedicines.map((med, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLookup(med)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all border border-transparent hover:border-slate-200 truncate ${
                    currentMedicine === med ? "bg-blue-50 text-blue-700 border-blue-200" : "text-slate-700 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {med}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-72px)] w-full">
          <div className="max-w-3xl mx-auto px-4 sm:px-5 py-6 sm:py-10 lg:py-16 w-full">
            {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F3460] mb-2 flex items-center gap-3">
              💊 Medicine Info
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Search any medicine to get dosage, side effects, interactions, and warnings
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-6 sm:mb-8 w-full">
            <div className="relative mb-4 w-full">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex-1 relative w-full">
                  <input
                    type="text"
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLookup()}
                    placeholder="Search any medicine... (e.g., Dolo 650)"
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 placeholder-slate-400 transition-colors text-base"
                  />
                  {medicineSearch && (
                    <button
                      onClick={() => setMedicineSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleLookup()}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 min-h-[44px] bg-[#0F3460] hover:bg-blue-900 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl z-20 max-h-[200px] overflow-y-auto shadow-md">
                  {filteredSuggestions.slice(0, 8).map((med) => (
                    <button
                      key={med}
                      onClick={() => {
                        setMedicineSearch(med);
                        setMedicineSearch("");
                        handleLookup(med);
                      }}
                      className="w-full px-4 py-3 min-h-[44px] text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 text-slate-700 text-base sm:text-sm"
                    >
                      {med}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden items-center w-full">
              <span className="text-slate-500 text-sm whitespace-nowrap shrink-0">Quick search:</span>
              {quickSearchMedicines.map((med) => (
                <button
                  key={med}
                  onClick={() => handleLookup(med)}
                  disabled={loading}
                  className="px-3 py-1.5 flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {med}
                </button>
              ))}
            </div>
          </div>



          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-300 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mb-8 space-y-4">
              <div className="h-48 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          )}

          {/* Response */}
          {response && !loading && (
            <div className="mb-8 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F3460] mb-4">{currentMedicine}</h2>
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm w-full overflow-hidden">
              <div className="medicine-content max-w-none text-sm sm:text-base break-words [word-break:break-word]">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-700 text-xs sm:text-sm">
                ⚠️ This is AI-generated information. Always verify with your
                pharmacist or doctor before taking any medicine.
              </div>
            </div>
          )}

          {!response && !loading && !error && (
            <div className="text-center text-slate-400 py-12">
              <p className="text-lg mb-2">🔍 Search for a medicine to get started</p>
              <p className="text-sm">Information includes dosage, side effects, interactions, and warnings</p>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
