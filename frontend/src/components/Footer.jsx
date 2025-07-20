import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <Sparkles className="w-8 h-8 text-cyan-400 mr-3" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              GuruX
            </span>
          </div>
          <p className="text-gray-500 mb-6">
            Empowering minds through artificial intelligence and innovative learning experiences
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-400">
            <span>&copy; 2025 AI Learning Platform. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
