"use client";

import Navbar from "@/components/layout/Navbar";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type QueryType = "info" | "interactions" | "dosage" | "side_effects";

export default function MedicinePage() {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentMedicine, setCurrentMedicine] = useState("");
  const [queryType, setQueryType] = useState<QueryType>("info");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch common medicines for autocomplete
  useEffect(() => {
    const fetchCommonMedicines = async () => {
      try {
        const data = await api.get("/api/v1/medicine/common");
        setSuggestions(data.data.medicines || []);
      } catch (err) {
        console.error("Failed to fetch common medicines", err);
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

      setResponse(data.data.response || "");
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-5 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0F3460] mb-2 flex items-center gap-3">
              💊 Medicine Info
            </h1>
            <p className="text-slate-500">
              Search any medicine to get dosage, side effects, interactions, and warnings
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="relative mb-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={medicineSearch}
                    onChange={(e) => setMedicineSearch(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLookup()}
                    placeholder="Search any medicine... (e.g., Dolo 650)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 placeholder-slate-400 transition-colors"
                  />
                  {medicineSearch && (
                    <button
                      onClick={() => setMedicineSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleLookup()}
                  disabled={loading}
                  className="px-6 py-3 bg-[#0F3460] hover:bg-blue-900 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Autocomplete Dropdown */}
              {filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl z-10 max-h-60 overflow-y-auto shadow-md">
                  {filteredSuggestions.slice(0, 8).map((med) => (
                    <button
                      key={med}
                      onClick={() => {
                        setMedicineSearch(med);
                        setMedicineSearch("");
                        handleLookup(med);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 text-slate-700"
                    >
                      {med}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="flex flex-wrap gap-2">
              <span className="text-slate-500 text-sm">Quick search:</span>
              {quickSearchMedicines.map((med) => (
                <button
                  key={med}
                  onClick={() => handleLookup(med)}
                  disabled={loading}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  {med}
                </button>
              ))}
            </div>
          </div>

          {/* Query Type Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["info", "interactions", "dosage", "side_effects"] as const).map(
              (type) => (
                <button
                  key={type}
                  onClick={() => {
                    setQueryType(type);
                    if (currentMedicine) handleLookup(currentMedicine, type);
                  }}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    queryType === type
                      ? "bg-[#0F3460] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type === "info"
                    ? "Overview"
                    : type === "interactions"
                      ? "Interactions"
                      : type === "dosage"
                        ? "Dosage"
                        : "Side Effects"}
                </button>
              )
            )}
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0F3460] mb-4">{currentMedicine}</h2>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="prose max-w-none text-slate-700">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
            </div>

              {/* Disclaimer */}
              <div className="mt-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-700 text-sm">
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
    </>
  );
}
