import { Brain, Users, Zap } from "lucide-react";

const Stats = () => {
  return (
    <div>
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">10M+</h3>
              <p className="text-gray-400">Knowledge Points Processed</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500K+</h3>
              <p className="text-gray-400">Active Learners</p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-gray-400">AI Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;
