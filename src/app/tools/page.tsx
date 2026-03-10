"use client";

import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

type Tab = "bmi" | "heart" | "diabetes" | "calorie" | "water";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("bmi");

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-5 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-[#0F3460] mb-2 flex items-center gap-3">
              🧮 Health Tools
            </h1>
            <p className="text-slate-500">
              Calculate your health metrics with science-backed formulas
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            {(
              [
                { id: "bmi", label: "BMI", icon: "⚖️" },
                { id: "heart", label: "Heart Risk", icon: "❤️" },
                { id: "diabetes", label: "Diabetes", icon: "🩸" },
                { id: "calorie", label: "Calories", icon: "🔥" },
                { id: "water", label: "Water", icon: "💧" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-xl font-semibold transition-colors text-sm md:text-base ${
                  activeTab === tab.id
                    ? "bg-[#0F3460] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span className="hidden md:inline">{tab.icon} </span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* BMI Calculator */}
          {activeTab === "bmi" && <BMICalculator />}

          {/* Heart Risk Calculator */}
          {activeTab === "heart" && <HeartRiskCalculator />}

          {/* Diabetes Risk Calculator */}
          {activeTab === "diabetes" && <DiabetesRiskCalculator />}

          {/* Calorie Calculator */}
          {activeTab === "calorie" && <CalorieCalculator />}

          {/* Water Intake Calculator */}
          {activeTab === "water" && <WaterIntakeCalculator />}
        </div>
      </div>
    </>
  );
}

function BMICalculator() {
  const [heightCm, setHeightCm] = useState("");
  const [weight, setWeight] = useState("");
  const [useMetric, setUseMetric] = useState(true);
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const calculateBMI = () => {
    let heightInMeters: number;

    if (useMetric) {
      heightInMeters = parseFloat(heightCm) / 100;
    } else {
      const totalInches = parseFloat(feet) * 12 + parseFloat(inches);
      heightInMeters = (totalInches * 2.54) / 100;
    }

    const weightKg = parseFloat(weight);
    if (!heightInMeters || !weightKg || heightInMeters <= 0 || weightKg <= 0)
      return null;

    const bmi = weightKg / (heightInMeters * heightInMeters);
    return parseFloat(bmi.toFixed(1));
  };

  const getBMICategory = (bmi: number) => {
    // Asian BMI cutoffs
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600", bgColor: "bg-blue-50 border border-blue-200" };
    if (bmi < 23) return { category: "Normal", color: "text-green-600", bgColor: "bg-green-50 border border-green-200" };
    if (bmi < 25) return { category: "Overweight", color: "text-orange-600", bgColor: "bg-orange-50 border border-orange-200" };
    return { category: "Obese", color: "text-red-600", bgColor: "bg-red-50 border border-red-200" };
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F3460] mb-6">BMI Calculator (Asian Cutoffs)</h2>

      {/* Unit Toggle */}
      <div className="mb-6 flex gap-4 text-slate-600">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={useMetric}
            onChange={() => setUseMetric(true)}
            className="w-4 h-4"
          />
          <span>Metric (cm, kg)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={!useMetric}
            onChange={() => setUseMetric(false)}
            className="w-4 h-4"
          />
          <span>Imperial (feet, inches, lbs)</span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {useMetric ? (
          <>
            <input
              type="number"
              placeholder="Height (cm)"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
            />
          </>
        ) : (
          <>
            <input
              type="number"
              placeholder="Feet"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
            />
            <input
              type="number"
              placeholder="Inches"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
            />
          </>
        )}

        <input
          type="number"
          placeholder={useMetric ? "Weight (kg)" : "Weight (lbs)"}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 col-span-2 md:col-span-1"
        />
      </div>

      {bmi && bmiInfo && (
        <div className={`p-6 rounded-xl ${bmiInfo.bgColor}`}>
          <div className="text-5xl font-bold mb-2">
            <span className={bmiInfo.color}>{bmi}</span>
          </div>
          <div className={`text-xl font-semibold ${bmiInfo.color} mb-4`}>
            {bmiInfo.category}
          </div>
          <div className="text-slate-600 text-sm">
            {bmiInfo.category === "Underweight" && "Aim to reach normal range 18.5-22.9"}
            {bmiInfo.category === "Normal" && "Maintain current lifestyle!"}
            {bmiInfo.category === "Overweight" && "Aim for 23.0-24.9 range with exercise & diet"}
            {bmiInfo.category === "Obese" && "Consult a doctor for a personalized weight loss plan"}
          </div>
        </div>
      )}
    </div>
  );
}

function HeartRiskCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [sysBP, setSysBP] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [hdl, setHdl] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [diabetic, setDiabetic] = useState(false);

  const calculateRisk = () => {
    const ageNum = parseFloat(age);
    const sysBPNum = parseFloat(sysBP);
    const cholNum = parseFloat(cholesterol);
    const hdlNum = parseFloat(hdl);

    if (!ageNum || !sysBPNum || !cholNum || !hdlNum) return null;

    // Simplified Framingham Risk Score
    let risk = 0;

    // Age-based risk
    if (ageNum >= 55) risk += 10;
    else if (ageNum >= 45) risk += 5;

    // BP-based risk
    if (sysBPNum >= 160) risk += 15;
    else if (sysBPNum >= 140) risk += 10;
    else if (sysBPNum >= 130) risk += 5;

    // Cholesterol ratio
    const ratio = cholNum / hdlNum;
    if (ratio > 5) risk += 15;
    else if (ratio > 4) risk += 10;

    // Lifestyle factors
    if (smoker) risk += 10;
    if (diabetic) risk += 15;

    return Math.min(100, Math.max(5, risk));
  };

  const getRiskLevel = (risk: number) => {
    if (risk < 10) return { level: "Low", color: "text-green-600", bgColor: "bg-green-50 border border-green-200" };
    if (risk < 20) return { level: "Moderate", color: "text-orange-600", bgColor: "bg-orange-50 border border-orange-200" };
    return { level: "High", color: "text-red-600", bgColor: "bg-red-50 border border-red-200" };
  };

  const risk = calculateRisk();
  const riskInfo = risk ? getRiskLevel(risk) : null;

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F3460] mb-6">10-Year Heart Attack Risk</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Systolic BP (mmHg)"
          value={sysBP}
          onChange={(e) => setSysBP(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <input
          type="number"
          placeholder="Total Cholesterol (mg/dL)"
          value={cholesterol}
          onChange={(e) => setCholesterol(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />

        <input
          type="number"
          placeholder="HDL Cholesterol (mg/dL)"
          value={hdl}
          onChange={(e) => setHdl(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 col-span-2"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8 text-slate-600">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={smoker}
            onChange={(e) => setSmoker(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Smoker</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={diabetic}
            onChange={(e) => setDiabetic(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Diabetic</span>
        </label>
      </div>

      {risk && riskInfo && (
        <div className={`p-6 rounded-xl ${riskInfo.bgColor}`}>
          <div className="text-5xl font-bold mb-2">
            <span className={riskInfo.color}>{risk.toFixed(0)}%</span>
          </div>
          <div className={`text-xl font-semibold ${riskInfo.color}`}>
            {riskInfo.level} Risk
          </div>
        </div>
      )}
    </div>
  );
}

function DiabetesRiskCalculator() {
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [familyHistory, setFamilyHistory] = useState(false);
  const [activity, setActivity] = useState("moderate");
  const [waist, setWaist] = useState("");

  const calculateRisk = () => {
    const ageNum = parseFloat(age);
    const bmiNum = parseFloat(bmi);
    const waistNum = parseFloat(waist);

    if (!ageNum || !bmiNum || !waistNum) return null;

    let score = 0;

    // Age-based risk
    if (ageNum >= 50) score += 4;
    else if (ageNum >= 40) score += 2;

    // BMI-based risk
    if (bmiNum >= 30) score += 3;
    else if (bmiNum >= 25) score += 1;

    // Waist circumference (Indian standards)
    const isMale = true; // Can be changed
    const waistThreshold = isMale ? 90 : 80; // cm
    if (waistNum >= waistThreshold) score += 2;

    // Family history
    if (familyHistory) score += 2;

    // Activity level
    if (activity === "sedentary") score += 2;
    else if (activity === "light") score += 1;

    return score;
  };

  const getRiskLevel = (score: number) => {
    if (score < 5) return { level: "Low Risk", color: "text-green-600", bgColor: "bg-green-50 border border-green-200" };
    if (score < 8) return { level: "Moderate Risk", color: "text-orange-600", bgColor: "bg-orange-50 border border-orange-200" };
    return { level: "High Risk", color: "text-red-600", bgColor: "bg-red-50 border border-red-200" };
  };

  const score = calculateRisk();
  const riskInfo = score !== null ? getRiskLevel(score) : null;

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F3460] mb-6">Diabetes Risk Assessment</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <input
          type="number"
          placeholder="BMI"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <input
          type="number"
          placeholder="Waist Circumference (cm)"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 col-span-2"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-8 text-slate-600">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.checked)}
            className="w-4 h-4"
          />
          <span>Family History of Diabetes</span>
        </label>
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-semibold text-slate-700">Physical Activity Level:</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
        >
          <option value="sedentary">Sedentary (no regular exercise)</option>
          <option value="light">Light (exercise 1-2 times/week)</option>
          <option value="moderate">Moderate (exercise 3-4 times/week)</option>
          <option value="active">Active (exercise 5+ times/week)</option>
        </select>
      </div>

      {score !== null && riskInfo && (
        <div className={`p-6 rounded-xl ${riskInfo.bgColor}`}>
          <div className="text-2xl font-bold mb-2">
            <span className={riskInfo.color}>Risk Score: {score}</span>
          </div>
          <div className={`text-lg font-semibold ${riskInfo.color}`}>
            {riskInfo.level}
          </div>
          <div className="text-slate-600 text-sm mt-2">
            {score >= 8 && "Consult a doctor for screening and lifestyle modification"}
            {score >= 5 && score < 8 && "Monitor your health and increase physical activity"}
            {score < 5 && "Maintain healthy lifestyle with regular exercise"}
          </div>
        </div>
      )}
    </div>
  );
}

function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");

  const calculateBMR = () => {
    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (!ageNum || !heightNum || !weightNum) return null;

    // Mifflin-St Jeor equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
    };

    const tdee = bmr * (activityMultipliers[activity] || 1.55);
    return { bmr: Math.round(bmr), tdee: Math.round(tdee) };
  };

  const calculateMacros = (tdee: number) => {
    const protein = Math.round((tdee * 0.3) / 4); // 30% protein, 4 cal/g
    const carbs = Math.round((tdee * 0.45) / 4); // 45% carbs
    const fats = Math.round((tdee * 0.25) / 9); // 25% fats, 9 cal/g

    return { protein, carbs, fats };
  };

  const result = calculateBMR();
  const macros = result ? calculateMacros(result.tdee) : null;

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F3460] mb-6">Daily Calorie &amp; Macros Calculator</h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-semibold text-slate-700">Activity Level:</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="light">Lightly Active (1-3 days/week)</option>
          <option value="moderate">Moderately Active (3-5 days/week)</option>
          <option value="active">Very Active (6-7 days/week)</option>
        </select>
      </div>

      {result && macros && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-sm text-slate-500 mb-1">Daily Calorie Need</div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {result.tdee}
            </div>
            <div className="text-sm text-slate-600">
              BMR: {result.bmr} | Activity multiplier: {activity}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <div className="text-sm text-slate-500">Protein</div>
              <div className="text-3xl font-bold text-orange-600">
                {macros.protein}g
              </div>
              <div className="text-xs text-slate-400">30% of calories</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-sm text-slate-500">Carbs</div>
              <div className="text-3xl font-bold text-blue-600">
                {macros.carbs}g
              </div>
              <div className="text-xs text-slate-400">45% of calories</div>
            </div>
            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <div className="text-sm text-slate-500">Fats</div>
              <div className="text-3xl font-bold text-yellow-600">
                {macros.fats}g
              </div>
              <div className="text-xs text-slate-400">25% of calories</div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
            <strong>Indian meal guide:</strong> That's roughly {Math.round(result.tdee / 3)} cal/meal
            × 3 meals, or about {Math.round((macros.carbs * 50) / (result.tdee / 100))} grams of
            rice/roti per meal
          </div>
        </div>
      )}
    </div>
  );
}
function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("hot");

  const calculateWater = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum) return null;

    // Base: 30ml per kg
    let waterLiters = (weightNum * 30) / 1000;

    // Activity adjustment
    const activityFactors: Record<string, number> = {
      sedentary: 1,
      light: 1.2,
      moderate: 1.4,
      active: 1.6,
    };

    waterLiters *= activityFactors[activity] || 1.4;

    // Climate adjustment
    const climateFactors: Record<string, number> = {
      cold: 0.9,
      moderate: 1,
      hot: 1.3,
    };

    waterLiters *= climateFactors[climate] || 1;

    const liters = Math.round(waterLiters * 10) / 10;
    const glasses = Math.round((liters / 0.24) * 10) / 10; // 1 glass = 240ml

    return { liters, glasses };
  };

  const result = calculateWater();

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-[#0F3460] mb-6">Daily Water Intake Calculator</h2>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
        />

        <div>
          <label className="block mb-2 font-semibold text-slate-700">Activity Level:</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
          >
            <option value="sedentary">Sedentary (no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (daily exercise)</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">Climate:</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
          >
            <option value="cold">Cold</option>
            <option value="moderate">Moderate</option>
            <option value="hot">Hot (summer)</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
            <div className="text-sm text-slate-500 mb-1">Daily Water Intake</div>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {result.liters}L
            </div>
            <div className="text-2xl font-semibold text-blue-500">
              {result.glasses} glasses
            </div>
            <div className="text-sm text-slate-600 mt-2">
              Spread throughout the day. Increase during exercise or heat.
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
            <strong>💡 Tip:</strong> Drink 1-2 glasses every 2 hours. In Indian
            summers, add electrolytes (ORS) + water for better hydration.
          </div>
        </div>
      )}
    </div>
  );
}
