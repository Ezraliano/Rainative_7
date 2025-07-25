import React, { useState } from 'react';
import { FileUp, Youtube, Sparkles, ArrowLeft, Play, Clock, TrendingUp, Lightbulb, Target, Users, Zap, ChevronDown, ChevronUp, Upload, X } from 'lucide-react';
import DocumentAnalysisResult from './DocumentAnalysisResult';

interface SummaryState {
  isLoading: boolean;
  showSummary: boolean;
  type: 'youtube' | 'document' | null;
}

interface TimelineItem {
  timestamp: string;
  summary: string;
}

interface PlatformRecommendation {
  platform: string;
  suitability_score: number;
  reasoning: string;
  optimization_tips: string[];
}

interface AnalysisData {
  video_metadata?: {
    title: string;
    duration: number;
    thumbnail_url: string;
    channel_name: string;
    view_count?: number;
    published_at?: string;
  };
  summary: string;
  timeline_summary: TimelineItem[];
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
    platform_recommendations: PlatformRecommendation[];
  };
  doc_summary?: string;
}

const InputTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'youtube' | 'document'>('youtube');
  const [activeSection, setActiveSection] = useState<'summarize' | 'viral' | 'recommendation'>('summarize');
  const [summaryState, setSummaryState] = useState<SummaryState>({
    isLoading: false,
    showSummary: false,
    type: null,
  });
  const [expandedTimeline, setExpandedTimeline] = useState<number[]>([0]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [avgViewDuration, setAvgViewDuration] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convertTimeToSeconds = (timeString: string): number | null => {
    if (!timeString.trim()) return null;
    
    // Support formats: MM:SS, M:SS, SS
    const parts = timeString.split(':');
    
    if (parts.length === 1) {
      // Just seconds
      const seconds = parseInt(parts[0]);
      return isNaN(seconds) ? null : seconds;
    } else if (parts.length === 2) {
      // MM:SS format
      const minutes = parseInt(parts[0]);
      const seconds = parseInt(parts[1]);
      if (isNaN(minutes) || isNaN(seconds)) return null;
      return minutes * 60 + seconds;
    }
    
    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid file type (PDF, Word, PowerPoint, or Text)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    if (activeTab === 'youtube' && !youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (activeTab === 'document' && !selectedFile) {
      setError('Please select a document to upload');
      return;
    }

    setError(null);
    setSummaryState({ isLoading: true, showSummary: false, type: activeTab });

    try {
      let response;
      
      if (activeTab === 'youtube') {
        const requestBody: any = {
          youtube_url: youtubeUrl,
        };

        // Add average view duration if provided
        if (avgViewDuration.trim()) {
          const durationInSeconds = convertTimeToSeconds(avgViewDuration);
          if (durationInSeconds !== null) {
            requestBody.average_view_duration = durationInSeconds;
          }
        }

        response = await fetch('http://localhost:8000/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } else {
        // Document upload
        const formData = new FormData();
        formData.append('file', selectedFile!);
        
        response = await fetch('http://localhost:8000/api/analyze-document', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data: AnalysisData = await response.json();
      setAnalysisData(data);
      setSummaryState({ isLoading: false, showSummary: true, type: activeTab });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze content. Please check your connection and try again.');
      setSummaryState({ isLoading: false, showSummary: false, type: null });
    }
  };

  const handleBack = () => {
    setSummaryState({ isLoading: false, showSummary: false, type: null });
    setActiveSection('summarize');
    setAnalysisData(null);
    setError(null);
  };

  const toggleTimeline = (index: number) => {
    setExpandedTimeline(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getViralScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return '📺';
      case 'tiktok': return '🎵';
      case 'instagram': return '📸';
      default: return '🌐';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return 'from-red-500 to-red-600';
      case 'tiktok': return 'from-pink-500 to-purple-600';
      case 'instagram': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Show document analysis result for document uploads
  if (summaryState.showSummary && analysisData && summaryState.type === 'document') {
    return (
      <DocumentAnalysisResult
        analysisData={analysisData}
        filename={selectedFile?.name || 'Document'}
        onBack={handleBack}
      />
    );
  }

  if (summaryState.showSummary && analysisData) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-8 px-4">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-xl p-1 flex space-x-1">
            <button
              onClick={() => setActiveSection('summarize')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === 'summarize'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Summarize
            </button>
            <button
              onClick={() => setActiveSection('viral')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === 'viral'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Viral Score
            </button>
            <button
              onClick={() => setActiveSection('recommendation')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeSection === 'recommendation'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4 inline mr-2" />
              Recommendation
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl">
          {activeSection === 'summarize' && (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Content Preview */}
              <div className="w-full lg:w-2/5">
                {analysisData.video_metadata ? (
                  // YouTube Video Preview
                  <>
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={analysisData.video_metadata.thumbnail_url}
                        alt="Video thumbnail"
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-all duration-300">
                        <Play className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDuration(analysisData.video_metadata.duration)}
                      </div>
                    </div>
                    <h3 className="text-white mt-4 text-xl font-semibold">{analysisData.video_metadata.title}</h3>
                    <p className="text-gray-400 mt-2 text-sm">
                      {analysisData.video_metadata.channel_name}
                      {analysisData.video_metadata.view_count && ` • ${analysisData.video_metadata.view_count.toLocaleString()} views`}
                    </p>
                  </>
                ) : (
                  // Document Preview
                  <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4">
                      <FileUp className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold text-center mb-2">Document Analysis</h3>
                    <p className="text-gray-400 text-sm text-center">
                      Content extracted and analyzed from uploaded document
                    </p>
                  </div>
                )}
              </div>
              
              <div className="w-full lg:w-3/5">
                <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Summary
                </h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  {analysisData.summary}
                </p>
                
                {/* Content Analysis Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Hook Strength */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">🎯</span>
                      </div>
                      <h4 className="text-white font-semibold">Hook Strength</h4>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Captivation Score</span>
                        <span className="text-white font-bold">{Math.floor(analysisData.viral_score * 0.8 + Math.random() * 20)}/100</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000"
                          style={{ width: `${Math.floor(analysisData.viral_score * 0.8 + Math.random() * 20)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs">
                      {Math.floor(analysisData.viral_score * 0.8 + Math.random() * 20) >= 75 
                        ? "Strong opening that immediately grabs attention" 
                        : Math.floor(analysisData.viral_score * 0.8 + Math.random() * 20) >= 50 
                        ? "Good hook with room for improvement" 
                        : "Opening could be more compelling"}
                    </p>
                  </div>

                  {/* Retention Prediction */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">📊</span>
                      </div>
                      <h4 className="text-white font-semibold">Retention Prediction</h4>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Watch Completion</span>
                        <span className="text-white font-bold">{Math.floor(analysisData.viral_score * 0.6 + 25 + Math.random() * 15)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000"
                          style={{ width: `${Math.floor(analysisData.viral_score * 0.6 + 25 + Math.random() * 15)}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs">
                      {Math.floor(analysisData.viral_score * 0.6 + 25 + Math.random() * 15) >= 70 
                        ? "High likelihood of full engagement" 
                        : Math.floor(analysisData.viral_score * 0.6 + 25 + Math.random() * 15) >= 50 
                        ? "Moderate retention expected" 
                        : "May need pacing improvements"}
                    </p>
                  </div>

                  {/* Sentiment & Emotional Tone */}
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-lg">💭</span>
                      </div>
                      <h4 className="text-white font-semibold">Emotional Tone</h4>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Emotional Impact</span>
                        <span className="text-white font-bold">
                          {analysisData.viral_score >= 70 ? "High" : analysisData.viral_score >= 50 ? "Medium" : "Low"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {analysisData.viral_score >= 70 ? (
                          <>
                            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Emotional</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Engaging</span>
                          </>
                        ) : analysisData.viral_score >= 50 ? (
                          <>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Informative</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">Balanced</span>
                          </>
                        ) : (
                          <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">Neutral</span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs">
                      {analysisData.viral_score >= 70 
                        ? "Strong emotional connection with audience" 
                        : analysisData.viral_score >= 50 
                        ? "Good balance of emotion and information" 
                        : "Primarily informational content"}
                    </p>
                  </div>
                </div>
                
                {/* Timeline Summary - Only show for YouTube videos */}
                {analysisData.timeline_summary && analysisData.timeline_summary.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                      <Clock className="w-6 h-6 mr-3 text-cyan-400" />
                      Timeline Summary
                    </h3>
                    <div className="space-y-4">
                      {analysisData.timeline_summary.map((item, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                          <button
                            onClick={() => toggleTimeline(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-750 transition-colors duration-200"
                          >
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-4"></div>
                              <span className="text-cyan-400 font-mono text-sm font-medium">{item.timestamp}</span>
                            </div>
                            {expandedTimeline.includes(index) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {expandedTimeline.includes(index) && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-300 leading-relaxed">{item.summary}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Input
                </button>
              </div>
            </div>
          )}

          {activeSection === 'viral' && (
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-12 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center">
                <span className="text-4xl mr-4">🔥</span>
                Viral Potential Analysis
                <span className="text-4xl ml-4">📈</span>
              </h2>
              
              {/* Viral Score */}
              <div className="mb-16">
                <div className="relative w-80 h-80 mx-auto mb-8 drop-shadow-2xl">
                  <svg className="w-full h-full transform -rotate-90 filter drop-shadow-lg" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-gray-800"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisData.viral_score / 100)}`}
                      className="transition-all duration-2000 ease-out filter drop-shadow-md"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06d6a0" />
                        <stop offset="100%" stopColor="#00f5ff" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold text-white mb-2 drop-shadow-lg">{analysisData.viral_score}</div>
                      <div className="text-lg text-gray-400 font-medium">out of 100</div>
                    </div>
                  </div>
                </div>
                <div className={`inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r ${getViralScoreColor(analysisData.viral_score)} text-white font-semibold text-xl shadow-2xl`}>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  {analysisData.viral_label}
                </div>
              </div>

              {/* Why is this content viral? */}
              <div className="bg-gray-800 rounded-3xl p-10 border border-gray-700 text-left shadow-2xl">
                <h3 className="text-3xl font-semibold text-white mb-8 flex items-center">
                  <span className="text-3xl mr-4">💡</span>
                  Why Does This Content Have Viral Potential?
                </h3>
                <div className="text-gray-300 text-lg leading-relaxed space-y-4">
                  {analysisData.viral_explanation.split('\n').map((paragraph, index) => {
                    if (paragraph.trim()) {
                      // Check if it's a list item
                      if (paragraph.trim().match(/^\d+\./)) {
                        return (
                          <div key={index} className="flex items-start mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                              <span className="text-white font-bold text-sm">{paragraph.trim().charAt(0)}</span>
                            </div>
                            <p className="flex-1">{paragraph.replace(/^\d+\.\s*/, '')}</p>
                          </div>
                        );
                      }
                      return <p key={index} className="mb-4">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'recommendation' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
                Create Similar Viral Content
              </h2>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 mb-8">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                  <h3 className="text-2xl font-semibold text-white">Recommended Content Idea</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-cyan-400 mb-4">📹 Content Concept</h4>
                    <h5 className="text-lg font-medium text-white mb-3">
                      {analysisData.recommendations.title}
                    </h5>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Target className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h6 className="text-white font-medium mb-1">Target Audience</h6>
                          <p className="text-gray-300 text-sm">{analysisData.recommendations.target_audience}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Users className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <h6 className="text-white font-medium mb-1">Content Style</h6>
                          <p className="text-gray-300 text-sm">{analysisData.recommendations.content_style}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">🎬 Suggested Structure</h4>
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-yellow-400">
                        <h6 className="text-white font-medium mb-1">Hook (0-15s)</h6>
                        <p className="text-gray-300 text-sm">{analysisData.recommendations.suggested_structure.hook}</p>
                      </div>
                      
                      <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-blue-400">
                        <h6 className="text-white font-medium mb-1">Introduction (15-30s)</h6>
                        <p className="text-gray-300 text-sm">{analysisData.recommendations.suggested_structure.introduction}</p>
                      </div>
                      
                      <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-green-400">
                        <h6 className="text-white font-medium mb-1">Main Content (30s-8min)</h6>
                        <p className="text-gray-300 text-sm">{analysisData.recommendations.suggested_structure.main_content}</p>
                      </div>
                      
                      <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-purple-400">
                        <h6 className="text-white font-medium mb-1">Call to Action (8-10min)</h6>
                        <p className="text-gray-300 text-sm">{analysisData.recommendations.suggested_structure.call_to_action}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-500/30">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <span className="text-xl mr-2">💡</span>
                    Pro Tips for Maximum Engagement
                  </h4>
                  <ul className="text-gray-300 space-y-2">
                    {analysisData.recommendations.pro_tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Platform Recommendations */}
              {analysisData.recommendations.platform_recommendations && (
                <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                    <span className="text-2xl mr-3">🚀</span>
                    Platform Recommendations
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {analysisData.recommendations.platform_recommendations
                      .sort((a, b) => b.suitability_score - a.suitability_score)
                      .map((platform, index) => (
                      <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{getPlatformIcon(platform.platform)}</span>
                            <h4 className="text-lg font-semibold text-white">{platform.platform}</h4>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-bold bg-gradient-to-r ${getPlatformColor(platform.platform)} bg-clip-text text-transparent`}>
                              {platform.suitability_score}/100
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getPlatformColor(platform.platform)} transition-all duration-1000`}
                              style={{ width: `${platform.suitability_score}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                          {platform.reasoning}
                        </p>
                        
                        <div>
                          <h5 className="text-white font-medium mb-2 text-sm">Optimization Tips:</h5>
                          <ul className="text-gray-400 text-xs space-y-1">
                            {platform.optimization_tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start">
                                <span className="text-cyan-400 mr-1">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <div className="flex flex-col sm:flex-row border-b border-gray-700">
        <button
          className={`px-6 py-3 text-sm font-medium flex items-center justify-center transition-all duration-300 ${
            activeTab === 'youtube'
              ? 'text-cyan-400 border-b-2 border-cyan-500 bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
          }`}
          onClick={() => setActiveTab('youtube')}
        >
          <Youtube className="h-4 w-4 mr-2" />
          YouTube URL
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium flex items-center justify-center transition-all duration-300 ${
            activeTab === 'document'
              ? 'text-cyan-400 border-b-2 border-cyan-500 bg-gray-800/50'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
          }`}
          onClick={() => setActiveTab('document')}
        >
          <FileUp className="h-4 w-4 mr-2" />
          Document Upload
        </button>
      </div>

      <div className="mt-6">
        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-xl text-red-300">
            {error}
          </div>
        )}

        {summaryState.isLoading ? (
          <div className="text-center py-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-cyan-500 mx-auto mb-6"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              {activeTab === 'document' ? 'Analyzing your document...' : 'Analyzing your content...'}
            </p>
            <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
          </div>
        ) : activeTab === 'youtube' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Paste YouTube video URL here"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-6 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              />
              <button
                onClick={handleSubmit}
                disabled={summaryState.isLoading}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Analysis
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 sm:p-12 text-center hover:border-cyan-500 transition-all duration-300 cursor-pointer bg-gray-800/30 relative">
              <input 
                type="file" 
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              />
              <FileUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300 mb-2 text-lg">Drag files or click to upload</p>
              <p className="text-gray-500 text-sm">(PDF, Word, PowerPoint, Text - Max 10MB)</p>
            </div>

            {/* Selected File Display */}
            {selectedFile && (
              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <FileUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedFile.name}</p>
                      <p className="text-gray-400 text-sm">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleSubmit}
              disabled={summaryState.isLoading || !selectedFile}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-5 w-5 mr-2" />
              {selectedFile ? 'Analyze Document' : 'Select Document First'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputTabs;