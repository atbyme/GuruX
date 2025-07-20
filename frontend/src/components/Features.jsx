import { Bot, Baseline as Timeline, GitBranch, Lightbulb } from "lucide-react";

const Features = () => {
  return (
    <div>
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover how our AI-powered platform transforms learning through
              cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* HoloMentor */}
            <div className="group">
              <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 h-full hover:border-blue-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      HoloMentor
                    </h3>
                    <p className="text-blue-300 font-medium">
                      AI-Powered 3D Assistant
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Meet your personal AI holographic mentor that responds to
                  voice and text queries in real-time. Get instant answers,
                  explanations, and guidance through immersive 3D interactions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    Voice Recognition
                  </span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">
                    3D Hologram
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    Real-time AI
                  </span>
                </div>
              </div>
            </div>

            {/* KnowledgeFlow */}
            <div className="group">
              <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <Timeline className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      KnowledgeFlow
                    </h3>
                    <p className="text-purple-300 font-medium">
                      Animated Learning Timeline
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Explore the evolution of AI and human knowledge through an
                  interactive, scroll-based timeline. Each milestone comes alive
                  with voice explanations and dynamic animations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    Scroll Animation
                  </span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                    Voice Narration
                  </span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                    Interactive Timeline
                  </span>
                </div>
              </div>
            </div>

            {/* SkillMap */}
            <div className="group">
              <div className="bg-gradient-to-br from-slate-800/50 to-green-900/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 h-full hover:border-green-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      SkillMap
                    </h3>
                    <p className="text-green-300 font-medium">
                      AI Learning Path Generator
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Visualize your skills as an interactive tree and receive
                  AI-generated learning paths tailored to your goals. Map
                  connections between concepts and track your progress.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                    Visual Mapping
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm">
                    AI Suggestions
                  </span>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm">
                    Progress Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* SparkHub */}
            <div className="group">
              <div className="bg-gradient-to-br from-slate-800/50 to-orange-900/20 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 h-full hover:border-orange-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-xl flex items-center justify-center mr-4 group-hover:rotate-6 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      SparkHub
                    </h3>
                    <p className="text-orange-300 font-medium">
                      Creative Idea Exchange
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Share and discover ideas in a dynamic bubble interface. Vote
                  on concepts, remix existing ideas, and collaborate with a
                  global community of innovators.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                    Floating Bubbles
                  </span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                    Idea Remixing
                  </span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                    Community Voting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
