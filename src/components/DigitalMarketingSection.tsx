import React from 'react';
import { TrendingUp, Target, Zap, BarChart3, Users, Lightbulb, ExternalLink, BookOpen } from 'lucide-react';

const DigitalMarketingSection: React.FC = () => {
  const marketingFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Viral Content Strategy",
      description: "Analyze what makes content go viral and apply those insights to your marketing campaigns.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Audience Targeting",
      description: "Understand your audience better through content analysis and engagement patterns.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Get detailed insights into content performance and optimization opportunities.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Content Ideation",
      description: "Generate fresh content ideas based on successful viral patterns and trends.",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  const blogPosts = [
    {
      title: "The Science Behind Viral Content: What Makes Videos Go Viral in 2024",
      excerpt: "Discover the psychological triggers and algorithmic factors that determine viral success.",
      readTime: "8 min read",
      category: "Strategy"
    },
    {
      title: "AI-Powered Content Analysis: Revolutionizing Digital Marketing",
      excerpt: "How artificial intelligence is transforming the way marketers understand and create content.",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      title: "From Zero to Viral: Case Studies of Successful Content Campaigns",
      excerpt: "Real-world examples of how brands achieved viral success using data-driven strategies.",
      readTime: "12 min read",
      category: "Case Study"
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Use <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Rainative AI</span> for Digital Marketing?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your digital marketing strategy with AI-powered content analysis. 
            Understand what drives engagement, predict viral potential, and create content that resonates with your audience.
          </p>
        </div>

        {/* Marketing Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {marketingFeatures.map((feature, index) => (
            <div key={index} className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:bg-gray-800/70">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="bg-gray-800/30 rounded-3xl p-8 mb-16 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Perfect for Digital Marketers</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Social Media Managers</h4>
              <p className="text-gray-300 text-sm">Analyze competitor content, understand trending topics, and create viral-worthy posts for your brand.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Content Strategists</h4>
              <p className="text-gray-300 text-sm">Develop data-driven content strategies based on viral patterns and audience engagement insights.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Marketing Analysts</h4>
              <p className="text-gray-300 text-sm">Extract actionable insights from content performance data to optimize marketing campaigns.</p>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
            <BookOpen className="w-6 h-6 mr-3 text-cyan-400" />
            Latest Insights & Resources
          </h3>
          <p className="text-gray-300 mb-8">Stay updated with the latest trends in viral content and digital marketing strategies.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:bg-gray-800/70 group cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-gray-400 text-xs">{post.readTime}</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                {post.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors duration-200">
                Read More
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-3xl p-8 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Marketing Strategy?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of marketers who use Rainative AI to create data-driven content strategies that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Free Analysis
            </button>
            <button className="px-8 py-3 bg-gray-800 border border-gray-600 text-white font-semibold rounded-xl hover:bg-gray-700 hover:border-gray-500 transition-all duration-300">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalMarketingSection;