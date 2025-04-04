
import React, { useEffect, useState } from 'react';

interface AnimatedQuoteProps {
  text: string;
  author: string;
}

export const AnimatedQuote: React.FC<AnimatedQuoteProps> = ({ text, author }) => {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAuthor, setShowAuthor] = useState(false);

  useEffect(() => {
    setVisible(true);
    
    // Start typing animation after a small delay
    const typingDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setTypedText(prev => {
          if (prev.length < text.length) {
            return text.substring(0, prev.length + 1);
          } else {
            clearInterval(interval);
            setTimeout(() => setShowAuthor(true), 500);
            return prev;
          }
        });
      }, 40); // Typing speed
      
      return () => clearInterval(interval);
    }, 500);
    
    return () => clearTimeout(typingDelay);
  }, [text]);

  return (
    <div className={`
      transform transition-all duration-700 ease-out
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      <div className="relative">
        <div className="text-white/20 text-6xl font-serif absolute -top-8 -left-4">"</div>
        <p className="text-white text-xl leading-relaxed font-medium mb-4 relative z-10">
          {typedText}
          <span className={`inline-block w-0.5 h-5 bg-white ml-0.5 align-middle ${typedText.length < text.length ? 'animate-pulse' : 'opacity-0'}`}></span>
        </p>
        
        {showAuthor && (
          <div className="flex items-center animate-fade-in">
            <div className="h-0.5 w-6 bg-white/40 mr-3"></div>
            <p className="text-white/80 font-medium">{author}</p>
          </div>
        )}
      </div>
    </div>
  );
};
