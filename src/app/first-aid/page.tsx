"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

interface Guide {
  id: string;
  title: string;
  icon: string;
  severity: "critical" | "high";
  summary: string;
  steps: string[];
  warning: string;
}

const FIRST_AID_GUIDES: Guide[] = [
  {
    id: "heart-attack",
    title: "Heart Attack",
    icon: "❤️‍🔥",
    severity: "critical",
    summary: "Chest pain, arm pain, sweating",
    steps: [
      "Call 112 or 108 immediately",
      "Help the person sit down in a comfortable position (leaning forward slightly)",
      "If they have aspirin and are not allergic, give 1 tablet (325mg) to chew slowly",
      "Loosen tight clothing around chest and neck",
      "If they become unconscious and stop breathing, start CPR: 30 chest compressions + 2 rescue breaths",
      "Do NOT give water or food",
      "Keep them calm and reassured until ambulance arrives"
    ],
    warning: "Every minute counts. Don't wait to see if symptoms improve."
  },
  {
    id: "choking",
    title: "Choking",
    icon: "🫁",
    severity: "critical",
    summary: "Can't breathe, can't speak, clutching throat",
    steps: [
      "Ask: 'Are you choking?' If they can't speak or cough, act immediately",
      "Stand behind the person, wrap your arms around their waist",
      "Make a fist with one hand, place it above their navel",
      "Grab your fist with other hand and thrust inward and upward sharply",
      "Repeat 5 times (Heimlich maneuver)",
      "If person becomes unconscious, lower them to ground and start CPR",
      "For infants: 5 back blows + 5 chest thrusts alternately"
    ],
    warning: "Do NOT slap on back if person is standing — can push object deeper."
  },
  {
    id: "burns",
    title: "Burns",
    icon: "🔥",
    severity: "high",
    summary: "Heat, chemical, or electrical burns",
    steps: [
      "Cool the burn under running tap water for 10-20 minutes",
      "Do NOT use ice, butter, toothpaste, or any home remedy",
      "Remove jewelry and loose clothing near the burn (before swelling)",
      "Cover with a clean, non-stick bandage or clean cloth",
      "For chemical burns: flush with water for 20+ minutes",
      "For electrical burns: ensure power source is off before touching person",
      "Seek medical help if burn is larger than your palm, on face/hands/genitals, or is blistering"
    ],
    warning: "Never pop blisters — they protect against infection."
  },
  {
    id: "snake-bite",
    title: "Snake Bite",
    icon: "🐍",
    severity: "critical",
    summary: "Common in rural India during monsoon",
    steps: [
      "Call 112/108 — get to hospital ASAP for anti-venom",
      "Keep the person still and calm — movement spreads venom faster",
      "Remove jewelry/watches near bite area (swelling will occur)",
      "Immobilize the bitten limb with a splint, keep below heart level",
      "Do NOT cut the wound, suck venom, or apply tourniquet",
      "Do NOT apply ice, electric shock, or any paste/powder",
      "Try to remember the snake's appearance (photo if safe) — helps doctors choose anti-venom",
      "Mark the edge of swelling with pen and note time — helps track spread"
    ],
    warning: "All snake bites need hospital evaluation. Even 'non-venomous' bites can cause infection."
  },
  {
    id: "fracture",
    title: "Fracture / Broken Bone",
    icon: "🦴",
    severity: "high",
    summary: "Severe pain, swelling, deformity",
    steps: [
      "Do NOT try to straighten or move the broken bone",
      "Immobilize the injured area — use a wooden stick, rolled newspaper, or cardboard as splint",
      "Tie the splint above and below the break with cloth strips (not too tight)",
      "Apply ice wrapped in cloth to reduce swelling — 15 min on, 15 min off",
      "For open fractures (bone visible): cover wound with clean cloth, do NOT push bone back",
      "Keep injured limb elevated if possible",
      "Get to hospital for X-ray and proper treatment"
    ],
    warning: "Suspected neck/spine fracture: Do NOT move the person. Wait for ambulance."
  },
  {
    id: "drowning",
    title: "Drowning",
    icon: "🌊",
    severity: "critical",
    summary: "Water emergency — act within 4 minutes",
    steps: [
      "Call 112 immediately",
      "Ensure your own safety first — use a pole, rope, or flotation device to reach them",
      "Once out of water, check if they're breathing",
      "If not breathing: start CPR immediately — 30 compressions + 2 breaths",
      "Do NOT try to remove water from lungs by pressing stomach",
      "Place in recovery position (on side) once breathing starts",
      "Keep them warm with blankets — hypothermia is common",
      "Get medical attention even if they seem fine — secondary drowning can occur hours later"
    ],
    warning: "Brain damage starts in 4-6 minutes without oxygen. CPR saves lives."
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    icon: "🩸",
    severity: "critical",
    summary: "Heavy bleeding from wound or injury",
    steps: [
      "Call 112 if bleeding is heavy or won't stop",
      "Apply firm, direct pressure with a clean cloth or bandage",
      "Do NOT remove the cloth even if soaked — add more layers on top",
      "Keep pressure for at least 15 minutes without checking",
      "Elevate the injured area above heart level if possible",
      "If blood spurts with heartbeat (arterial): apply pressure point above the wound",
      "For nosebleed: lean forward (NOT backward), pinch soft part of nose for 10 minutes"
    ],
    warning: "If person becomes dizzy, pale, or confused — they may be going into shock. Lay them down, elevate legs."
  },
  {
    id: "heatstroke",
    title: "Heatstroke / Sunstroke",
    icon: "🌡️",
    severity: "high",
    summary: "Very common in Indian summers",
    steps: [
      "Move person to shade or AC room immediately",
      "Remove excess clothing",
      "Cool them rapidly: pour water on body, fan them, apply ice packs to neck/armpits/groin",
      "Give ORS or salted water if they're conscious and can drink",
      "Do NOT give very cold water to drink — causes cramps",
      "If body temperature is above 104°F (40°C) — this is an emergency, call 108",
      "Fan them continuously while waiting for help"
    ],
    warning: "Heatstroke kills 2,500+ Indians every summer. Stay hydrated and avoid 12-3 PM outdoor exposure."
  },
  {
    id: "seizure",
    title: "Seizure / Fits",
    icon: "⚡",
    severity: "high",
    summary: "Uncontrolled shaking, loss of consciousness",
    steps: [
      "Clear the area — move sharp or hard objects away",
      "Place something soft under their head (folded cloth, pillow)",
      "Turn them on their side (recovery position) to prevent choking",
      "Do NOT put anything in their mouth — they will NOT swallow their tongue",
      "Do NOT try to hold them down or stop the shaking",
      "Time the seizure — if it lasts more than 5 minutes, call 112",
      "Stay with them until they're fully conscious and oriented",
      "After seizure: they may be confused. Speak calmly, explain what happened."
    ],
    warning: "Putting a spoon or finger in their mouth is a MYTH and causes injury. Don't do it."
  },
  {
    id: "poisoning",
    title: "Poisoning / Overdose",
    icon: "☠️",
    severity: "critical",
    summary: "Swallowed chemicals, medicines, or pesticides",
    steps: [
      "Call Poison Control: 1800-116-117 or take to hospital immediately",
      "Try to identify what was swallowed, how much, and when",
      "Do NOT induce vomiting — some chemicals cause more damage coming back up",
      "If person is conscious: rinse mouth with water, do NOT give milk or anything to drink unless instructed",
      "If pesticide on skin: remove contaminated clothes, wash skin with soap and water for 15-20 minutes",
      "If inhaled (gas leak, paint fumes): move to fresh air immediately",
      "Bring the container/bottle of what was consumed to the hospital"
    ],
    warning: "Never induce vomiting for acids, bleach, or petrol — causes severe throat burns."
  }
];

export default function FirstAidPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuides = FIRST_AID_GUIDES.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shareOnWhatsApp = (guide: Guide) => {
    const text = `🚨 FIRST AID: ${guide.title}\n\n${guide.summary}\n\nSteps:\n${guide.steps
      .slice(0, 3)
      .map((s, i) => `${i + 1}. ${s}`)
      .join("\n")}\n\nMore details on Medic24 AI\n🌐 ${window.location.origin}`;
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
              🚑 First Aid Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              Emergency procedures — works offline. For medical emergencies, always call 112/108.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 sm:mb-8">
            <input
              type="text"
              placeholder="Search emergency guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-slate-800 placeholder-slate-400 text-sm sm:text-base"
            />
          </div>

          {/* Critical Severity Notice */}
          <div className="mb-6 sm:mb-8 p-4 bg-red-50 border border-red-300 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-2xl sm:text-3xl hidden sm:block">🚨</span>
            <div>
              <h3 className="font-bold text-red-700 text-sm sm:text-base flex items-center gap-2">
                <span className="sm:hidden">🚨</span> For Critical Emergencies:
              </h3>
              <p className="text-red-600 text-xs sm:text-sm mt-1">
                Call 112 (Universal) or 108 (Ambulance). Always prioritize professional medical help.
              </p>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredGuides.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setExpandedId(guide.id)}
                className={`flex flex-col p-4 sm:p-6 rounded-xl border text-left transition-all ${
                  guide.severity === "critical"
                    ? "bg-red-50 border-red-300 hover:bg-red-100"
                    : "bg-amber-50 border-amber-300 hover:bg-amber-100"
                }`}
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4 w-full">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl leading-none">{guide.icon}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F3460] leading-tight break-words">{guide.title}</h3>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2">{guide.summary}</p>
                  </div>
                  <div
                    className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shrink-0 ${
                      guide.severity === "critical"
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                    } whitespace-nowrap`}
                  >
                    {guide.severity.toUpperCase()}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Guide Modal */}
          {expandedId && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 mt-16 sm:mt-0">
                {(() => {
                  const guide = FIRST_AID_GUIDES.find(g => g.id === expandedId);
                  if (!guide) return null;
                  
                  return (
                    <>
                      <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl sm:rounded-2xl z-10">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl">{guide.icon}</span>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0F3460]">{guide.title}</h3>
                        </div>
                        <button 
                          onClick={() => setExpandedId(null)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                      
                      <div className="p-4 sm:p-6 overflow-y-auto">
                        <div className="mb-6">
                          <h4 className="font-bold text-[#0F3460] mb-3 text-base sm:text-lg">Steps to Follow:</h4>
                          <ol className="space-y-3 sm:space-y-4">
                            {guide.steps.map((step, idx) => (
                              <li key={idx} className="flex gap-3 sm:gap-4">
                                <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0F3460] text-white font-bold text-xs sm:text-sm mt-0.5 sm:mt-0">
                                  {idx + 1}
                                </span>
                                <span className="text-slate-600 text-sm sm:text-base">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-4 bg-red-50 border border-red-300 rounded-xl mb-6">
                          <h4 className="font-bold text-red-700 mb-1 sm:mb-2 text-sm sm:text-base">⚠️ Warning:</h4>
                          <p className="text-red-600 text-xs sm:text-sm">{guide.warning}</p>
                        </div>

                        <button
                          onClick={() => shareOnWhatsApp(guide)}
                          className="w-full px-4 py-3 sm:py-3.5 bg-[#0F3460] hover:bg-blue-900 text-white rounded-xl font-semibold transition-colors min-h-[44px]"
                        >
                          📱 Share on WhatsApp
                        </button>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}

          {filteredGuides.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm sm:text-lg">No guides found</p>
            </div>
          )}

          {/* Emergency Numbers Card */}
          <div className="mt-8 sm:mt-12 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-[#0F3460] mb-3 sm:mb-4">📞 Important Emergency Numbers:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-slate-600">
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">112</span> <span>- All Emergencies</span></div>
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">108</span> <span>- Ambulance</span></div>
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">1075</span> <span>- COVID Helpline</span></div>
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">1800-599-0019</span> <span>- Mental Health</span></div>
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">1800-116-117</span> <span>- Poison Control</span></div>
              <div className="flex justify-between md:justify-start md:gap-2"><span className="font-bold text-blue-600">9152987821</span> <span>- iCall Crisis Line</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
