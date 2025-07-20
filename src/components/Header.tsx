import React from 'react';
import { Sparkles, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-8 px-8 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-40">
      <div className="flex items-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center">
          <Sparkles className="h-10 w-10 mr-4 text-cyan-400" />
          Rainative AI
        </h1>
      </div>
    </header>
  );
};

export default Header;