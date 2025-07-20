import React, { useState } from 'react';
import { FileText, Clock, Target, Lightbulb, ArrowLeft, CheckCircle, AlertTriangle, HelpCircle, TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentInfo {
  document_type: string;
  estimated_reading_time: string;
  complexity: string;
}

interface StrengthsWeaknesses {
  strengths: string[];
  weaknesses: string[];
}

interface NumericalAnalysis {
  has_numerical_data: boolean;
  summary: string;
  key_figures: any;
  insights: string[];
}

interface AnalysisData {
  summary: string;
  strengths_weaknesses?: StrengthsWeaknesses;
  exploration_questions?: string[];
  recommendations?: string[];
  numerical_analysis?: NumericalAnalysis;
  document_info?: DocumentInfo;
  word_count?: number;
  content_preview?: string;
  viral_score: number;
  viral_label: string;
  viral_explanation: string;
  recommendations: {
    title: string;
    target_audience: string;
    content_style: string;
    suggested_structure: {
      hook: string;
      introduction: string;
      main_content: string;
      call_to_action: string;
    };
    pro_tips: string[];
    estimated_viral_score: number;
  };
}

interface DocumentAnalysisResultProps {
  analysisData: AnalysisData;
  filename: string;
  onBack: () => void;
}

const DocumentAnalysisResult: React.FC<DocumentAnalysisResultProps> = ({
  analysisData,
  filename,
  onBack
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['summary']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity?.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const SectionHeader: React.FC<{ 
    id: string; 
    title: string; 
    icon: React.ReactNode; 
    count?: number;
    color?: string;
  }> = ({ id, title, icon, count, color = "text-cyan-400" }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-200"
    >
      <div className="flex items-center">
        <div className={`${color} mr-3`}>{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {count !== undefined && (
          <span className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
            {count}
          </span>
        )}
      </div>
      {expandedSections.includes(id) ? (
        <ChevronUp className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4">
      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Document Preview */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">{filename}</h3>
              
              {analysisData.document_info && (
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-cyan-400 font-medium text-xs">{analysisData.document_info.document_type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Reading Time:</span>
                    <span className="text-white flex items-center text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {analysisData.document_info.estimated_reading_time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Complexity:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(analysisData.document_info.complexity)}`}>
                      {analysisData.document_info.complexity}
                    </span>
                  </div>
                  {analysisData.word_count && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Word Count:</span>
                      <span className="text-white text-xs">{analysisData.word_count.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Overview */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Document Analysis Overview
            </h2>
            <p className="text-gray-300 mb-4 text-base leading-relaxed">
              Comprehensive analysis of your document including summary, strengths & weaknesses, exploration questions, and actionable recommendations.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-cyan-400 text-lg font-bold">
                  {analysisData.strengths_weaknesses?.strengths?.length || 0}
                </div>
                <div className="text-gray-400 text-xs">Strengths</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-orange-400 text-lg font-bold">
                  {analysisData.strengths_weaknesses?.weaknesses?.length || 0}
                </div>
                <div className="text-gray-400 text-xs">Areas to Improve</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-purple-400 text-lg font-bold">
                  {analysisData.exploration_questions?.length || 0}
                </div>
                <div className="text-gray-400 text-xs">Questions</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                <div className="text-green-400 text-lg font-bold">
                  {analysisData.recommendations?.length || 0}
                </div>
                <div className="text-gray-400 text-xs">Recommendations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="space-y-4">
          {/* 1. Summary */}
          <div>
            <SectionHeader 
              id="summary" 
              title="Summary of Main Content" 
              icon={<FileText className="w-5 h-5" />}
            />
            {expandedSections.includes('summary') && (
              <div className="mt-4 p-6 bg-gray-800 rounded-xl border border-gray-700">
                <p className="text-gray-300 leading-relaxed">{analysisData.summary}</p>
              </div>
            )}
          </div>

          {/* 2. Strengths & Weaknesses */}
          {analysisData.strengths_weaknesses && (
            <div>
              <SectionHeader 
                id="strengths-weaknesses" 
                title="Strengths & Weaknesses Analysis" 
                icon={<Target className="w-5 h-5" />}
                count={(analysisData.strengths_weaknesses.strengths?.length || 0) + (analysisData.strengths_weaknesses.weaknesses?.length || 0)}
                color="text-green-400"
              />
              {expandedSections.includes('strengths-weaknesses') && (
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-green-400 font-semibold mb-4 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Strengths ({analysisData.strengths_weaknesses.strengths?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {analysisData.strengths_weaknesses.strengths?.map((strength, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-green-400 text-xs font-bold">+</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{strength}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <h4 className="text-orange-400 font-semibold mb-4 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Areas for Improvement ({analysisData.strengths_weaknesses.weaknesses?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {analysisData.strengths_weaknesses.weaknesses?.map((weakness, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-orange-400 text-xs font-bold">!</span>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">{weakness}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Exploration Questions */}
          {analysisData.exploration_questions && analysisData.exploration_questions.length > 0 && (
            <div>
              <SectionHeader 
                id="questions" 
                title="Questions for In-Depth Exploration" 
                icon={<HelpCircle className="w-5 h-5" />}
                count={analysisData.exploration_questions.length}
                color="text-purple-400"
              />
              {expandedSections.includes('questions') && (
                <div className="mt-4 bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-4">
                    {analysisData.exploration_questions.map((question, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-purple-400 font-bold text-sm">?</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Recommendations */}
          {analysisData.recommendations && analysisData.recommendations.length > 0 && (
            <div>
              <SectionHeader 
                id="recommendations" 
                title="Recommendations for Improvement & Next Actions" 
                icon={<Lightbulb className="w-5 h-5" />}
                count={analysisData.recommendations.length}
                color="text-yellow-400"
              />
              {expandedSections.includes('recommendations') && (
                <div className="mt-4 bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="space-y-4">
                    {analysisData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-yellow-400 font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Numerical Analysis */}
          {analysisData.numerical_analysis && analysisData.numerical_analysis.has_numerical_data && (
            <div>
              <SectionHeader 
                id="numerical" 
                title="Numerical Analysis & Data Insights" 
                icon={<BarChart3 className="w-5 h-5" />}
                color="text-blue-400"
              />
              {expandedSections.includes('numerical') && (
                <div className="mt-4 bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <p className="text-gray-300 mb-4 leading-relaxed">{analysisData.numerical_analysis.summary}</p>
                  
                  {analysisData.numerical_analysis.key_figures && (
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-blue-400 text-lg font-bold">
                          {analysisData.numerical_analysis.key_figures.numbers_found || 0}
                        </div>
                        <div className="text-gray-400 text-sm">Numbers Found</div>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-green-400 text-lg font-bold">
                          {analysisData.numerical_analysis.key_figures.percentages?.length || 0}
                        </div>
                        <div className="text-gray-400 text-sm">Percentages</div>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="text-yellow-400 text-lg font-bold">
                          {analysisData.numerical_analysis.key_figures.currencies?.length || 0}
                        </div>
                        <div className="text-gray-400 text-sm">Currency Values</div>
                      </div>
                    </div>
                  )}
                  
                  {analysisData.numerical_analysis.insights && analysisData.numerical_analysis.insights.length > 0 && (
                    <div>
                      <h5 className="text-white font-medium mb-3">Key Data Insights:</h5>
                      <ul className="space-y-2">
                        {analysisData.numerical_analysis.insights.map((insight, index) => (
                          <li key={index} className="flex items-start text-gray-300 text-sm">
                            <span className="text-blue-400 mr-2 mt-1">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Viral Potential */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-3" />
            Content Viral Potential
          </h3>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-300">Estimated Score:</span>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-gray-700 rounded-full mr-3">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                  style={{ width: `${analysisData.viral_score}%` }}
                ></div>
              </div>
              <span className="text-white font-bold">{analysisData.viral_score}/100</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            {analysisData.viral_explanation}
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Analyze Another Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalysisResult;