import { ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div>
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of learners already experiencing the future of AI-powered education
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard" className="group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3">
              Start Free Trial
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
            <button className="group border-2 border-blue-400 hover:border-cyan-400 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-400/10 flex items-center justify-center gap-3">
              Schedule Demo
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CTA
