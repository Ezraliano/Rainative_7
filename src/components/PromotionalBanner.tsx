import React from 'react';
import { Zap, TrendingUp, Target, Sparkles, Mail, Github, Linkedin, X } from 'lucide-react';

const PromotionalBanner: React.FC = () => {
  const [showDeveloperModal, setShowDeveloperModal] = React.useState(false);

  return (
    <>
      <div className="w-full px-4 sm:px-6 py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Go Viral?
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
          Join thousands of content creators who use Rainative AI to analyze, optimize, and create viral content 
          that reaches millions of viewers worldwide.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 transform">
            <Zap className="h-5 w-5 mr-2" />
            Start Creating Now
          </button>
          <button 
            onClick={() => setShowDeveloperModal(true)}
            className="w-full sm:w-auto bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-gray-700/80 hover:border-gray-500 transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-gray-500/25 hover:scale-105 transform"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Developer
          </button>
        </div>
        
        {/* Features Grid - Scale.com inspired */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Viral Analysis</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Get detailed viral potential scores and understand what makes content shareable and engaging.
            </p>
          </div>
          
          <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">AI Summaries</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Extract key insights from any content with timeline breakdowns and comprehensive analysis.
            </p>
          </div>
          
          <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-3">Smart Recommendations</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              Receive personalized content ideas and strategies to maximize your reach and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>

      {/* Developer Modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-3xl p-8 max-w-2xl w-full border border-gray-700 relative">
            <button
              onClick={() => setShowDeveloperModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Meet the Developer</h3>
              <p className="text-gray-400">Building the future of AI tools</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="/public/Foto Laskar AI.jpg" 
                  alt="Developer Photo" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gradient-to-r from-cyan-400 to-blue-500 shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h4 className="text-xl font-bold text-white mb-2">Ezraliano Sachio Krisnadiva</h4>
                <p className="text-cyan-400 font-medium mb-4">AI Engineer & Full-Stack Developer</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Passionate about creating AI-powered solutions that help businesses succees and efficient. Graduated from
                  Laskar AI Program at Listasarta. Graduated from Ma Chung University Malang Bachelor Computer Science.
                </p>
                
                {/* Contact Information */}
                <div className="mb-6">
                  <h5 className="text-white font-semibold mb-2">Get in Touch</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start">
                      <Mail className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300 text-sm">krisnadiva456@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Github className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300 text-sm">https://github.com/Ezraliano</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Linkedin className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300 text-sm">linkedin.com/in/ezraliano-sachio</span>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h5 className="text-white font-semibold mb-2">Expertise</h5>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">Python</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">React</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">AI/ML</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium">FastAPI</span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-medium">TensorFlow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalBanner;