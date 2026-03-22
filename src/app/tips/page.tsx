"use client";

import Navbar from "@/components/layout/Navbar";
import api from "@/lib/api";
import { useEffect, useState } from "react";

interface Tip {
  id: number;
  title: string;
  tip: string;
  category: string;
  icon: string;
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [todayTip, setTodayTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch tips and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get today's tip
        const todayData = await api.get("/api/v1/tips/today");
        setTodayTip(todayData.data.tip);

        // Get all tips
        const allTipsData = await api.get("/api/v1/tips/all");
        setTips(allTipsData.data.tips);

        // Get categories
        const categoriesData = await api.get("/api/v1/tips/categories");
        setCategories(categoriesData.data.categories);
      } catch (err) {
        console.error("Failed to fetch tips", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredTips = selectedCategory
    ? tips.filter((tip) => tip.category === selectedCategory)
    : tips;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      nutrition: "from-orange-600 to-orange-700",
      exercise: "from-green-600 to-green-700",
      checkup: "from-blue-600 to-blue-700",
      lifestyle: "from-purple-600 to-purple-700",
      mental: "from-pink-600 to-pink-700",
      seasonal: "from-yellow-600 to-yellow-700",
      safety: "from-red-600 to-red-700",
      hygiene: "from-cyan-600 to-cyan-700",
      emergency: "from-red-700 to-red-800",
    };
    return colors[category] || "from-slate-600 to-slate-700";
  };

  const shareOnWhatsApp = (tip: Tip) => {
    const text = `💡 Health Tip: ${tip.title}\n\n${tip.tip.substring(0, 200)}...\n\nCheck out more tips on Medic24 AI!\n🌐 ${window.location.origin}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-6 sm:py-12">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-[#0F3460] mb-2 flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
              💡 Daily Health Tips
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Science-backed health advice for Indians. Rotate with the calendar!
            </p>
          </div>

          {/* Today's Featured Tip */}
          {todayTip && !loading && (
            <div
              className={`mb-8 sm:mb-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${getCategoryColor(todayTip.category)} text-white shadow-md`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <span className="text-5xl sm:text-6xl">{todayTip.icon}</span>
                <div className="flex-1 w-full flex flex-col items-center sm:items-start">
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm mb-3">
                    Today's Tip
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">{todayTip.title}</h2>
                  <p className="text-sm sm:text-lg leading-relaxed">{todayTip.tip}</p>
                  <button
                    onClick={() => shareOnWhatsApp(todayTip)}
                    className="mt-4 px-4 py-3 sm:py-2 bg-white/20 hover:bg-white/30 rounded-xl sm:rounded-lg transition-colors text-sm font-semibold w-full sm:w-auto min-h-[44px]"
                  >
                    📱 Share on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-[#0F3460] mb-3 sm:mb-4">Filter by Category:</h3>
            <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden w-full snap-x">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base min-h-[44px] ${
                  selectedCategory === null
                    ? "bg-[#0F3460] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Tips
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 snap-start px-4 py-2 rounded-full font-semibold transition-colors capitalize text-sm sm:text-base min-h-[44px] ${
                    selectedCategory === cat
                      ? "bg-[#0F3460] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tips Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 sm:h-64 bg-slate-100 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <span className="text-3xl sm:text-4xl">{tip.icon}</span>
                    <span className="px-2 py-1 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 capitalize">
                      {tip.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#0F3460] mb-2 sm:mb-3 group-hover:text-blue-700 transition-colors">
                    {tip.title}
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm mb-4 line-clamp-3 lg:line-clamp-4 flex-1">
                    {tip.tip}
                  </p>

                  <button
                    onClick={() => shareOnWhatsApp(tip)}
                    className="w-full px-3 py-3 sm:py-2 bg-slate-50 border border-slate-200 hover:bg-[#0F3460] hover:text-white hover:border-[#0F3460] rounded-xl text-sm font-semibold transition-all text-slate-600 min-h-[44px]"
                  >
                    📱 Share
                  </button>
                </div>
              ))}
            </div>
          )}

          {filteredTips.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-400">
              <p>No tips found in this category</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
