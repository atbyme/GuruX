import React from "react";
import { Link } from "react-router-dom";
import { Bot, Baseline as Timeline, GitBranch, Lightbulb } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";

const cards = [
  {
    id: "holoMentor",
    title: "HoloMentor",
    description: "AI-Powered 3D Assistant",
    buttonText: "Go to HoloMentor",
    icon: <Bot className="w-10 h-10 text-cyan-400" />,
    link: "/ai",
    bgGradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "knowledgeFlow",
    title: "KnowledgeFlow",
    description: "Animated Learning Timeline",
    buttonText: "Explore Timeline",
    icon: <Timeline className="w-10 h-10 text-purple-400" />,
    link: "/react", 
    bgGradient: "from-purple-600 to-pink-500",
  },
  {
    id: "skillMap",
    title: "SkillMap",
    description: "AI Learning Path Generator",
    buttonText: "Open SkillMap",
    icon: <GitBranch className="w-10 h-10 text-green-400" />,
    link: "/",
    bgGradient: "from-green-600 to-emerald-400",
  },
  {
    id: "sparkHub",
    title: "SparkHub",
    description: "Creative Idea Exchange",
    buttonText: "Visit SparkHub",
    icon: <Lightbulb className="w-10 h-10 text-orange-400" />,
    link: "/sparkhub", 
    bgGradient: "from-orange-600 to-yellow-400",
  },
];

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-slate-900 text-white px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
        Dashboard
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map(
          ({ id, title, description, buttonText, icon, link, bgGradient }) => (
            <div
              key={id}
              className="flex flex-col justify-between bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
            >
              <div>
                <div className="mb-4">{icon}</div>
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-300 mb-6">{description}</p>
              </div>
              <Link
                to={link}
                className={`inline-block text-center font-semibold px-6 py-3 rounded-xl bg-gradient-to-r ${bgGradient} hover:brightness-110 transition`}
              >
                {buttonText}
              </Link>
            </div>
          )
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
