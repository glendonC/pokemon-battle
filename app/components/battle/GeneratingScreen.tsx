import React from 'react';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';

interface GeneratingScreenProps {
  objectName: string;
}

const GeneratingScreen = ({ objectName }: GeneratingScreenProps) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff0033,transparent_70%)]" />
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 opacity-10">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i}
              className="bg-green-500/20 rounded-sm animate-pulse"
              style={{ 
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative space-y-8 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-green-400">
          Generating Character
        </h2>
        
        {/* Object Name */}
        <div className="text-2xl text-green-300 flex items-center justify-center gap-3">
          <Wand2 className="animate-bounce" />
          <span>Transforming: {objectName}</span>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4 text-lg">
          <div className="flex items-center justify-center gap-3 text-white/80">
            <Loader2 className="animate-spin" />
            <span>Analyzing object properties...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/60">
            <Sparkles className="animate-pulse" />
            <span>Creating unique abilities...</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-white/40">
            <Sparkles className="animate-pulse" />
            <span>Designing character appearance...</span>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-green-900 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-green-400 animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Loading animation keyframes */}
      <style jsx global>{`
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default GeneratingScreen;