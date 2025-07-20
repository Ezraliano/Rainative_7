import React from 'react';
import InputTabs from './InputTabs';

const MainSection: React.FC = () => {
  return (
    <div className="text-center py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            AI-Powered
          </span>
          <br />
          Content Analysis
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
          Discover viral potential, get detailed summaries, and receive AI-powered recommendations 
          to create content that resonates with your audience.
        </p>
        <InputTabs />
      </div>
    </div>
  );
};

export default MainSection;