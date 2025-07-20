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
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-12 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Go Viral?
          </span>
        </h2>
        <p className="text-xl sm:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          Join thousands of content creators who use Rainative AI to analyze, optimize, and create viral content 
          that reaches millions of viewers worldwide.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-12 py-6 rounded-2xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 text-lg hover:scale-105 transform">
            <Zap className="h-6 w-6 mr-3" />
            Start Creating Now
          </button>
          <button 
            onClick={() => setShowDeveloperModal(true)}
            className="w-full sm:w-auto bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-white font-semibold px-12 py-6 rounded-2xl hover:bg-gray-700/80 hover:border-gray-500 transition-all duration-300 inline-flex items-center justify-center shadow-xl hover:shadow-gray-500/25 text-lg hover:scale-105 transform"
          >
            <Mail className="h-6 w-6 mr-3" />
            Contact Developer
          </button>
        </div>
        
        {/* Features Grid - Scale.com inspired */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Viral Analysis</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Get detailed viral potential scores and understand what makes content shareable and engaging.
            </p>
          </div>
          
          <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">AI Summaries</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Extract key insights from any content with timeline breakdowns and comprehensive analysis.
            </p>
          </div>
          
          <div className="group bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Smart Recommendations</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
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
              <h3 className="text-3xl font-bold text-white mb-2">Meet the Developer</h3>
              <p className="text-gray-400">Building the future of content analysis</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Developer Photo" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-gradient-to-r from-cyan-400 to-blue-500 shadow-2xl"
                />
              </div>
              <div className="text-center md:text-left flex-1">
                <h4 className="text-2xl font-bold text-white mb-2">Alex Johnson</h4>
                <p className="text-cyan-400 font-medium mb-4 text-lg">AI Engineer & Full-Stack Developer</p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Passionate about creating AI-powered solutions that help content creators succeed. 
                  With 5+ years of experience in machine learning and web development, I built Rainative AI 
                  to democratize content analysis and viral prediction for creators worldwide.
                </p>
                
                {/* Contact Information */}
                <div className="mb-6">
                  <h5 className="text-white font-semibold mb-3">Get in Touch</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start">
                      <Mail className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300">alex.johnson@rainative.ai</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Github className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300">github.com/alexjohnson</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <Linkedin className="h-4 w-4 text-cyan-400 mr-3" />
                      <span className="text-gray-300">linkedin.com/in/alexjohnson</span>
                    </div>
                  </div>
                </div>
                
                {/* Skills */}
                <div>
                  <h5 className="text-white font-semibold mb-3">Expertise</h5>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">Python</span>
                    <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium">React</span>
                    <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">AI/ML</span>
                    <span className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">FastAPI</span>
                    <span className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full text-sm font-medium">TensorFlow</span>
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