import React, { useState, useEffect } from 'react';
import { Moon, Sun, Rocket, Stars, Plane as Planet, Sparkles } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [question, setQuestion] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<null | {
    side: 'HEADS' | 'TAILS';
    response: {
      statement: string;
      pros: string[];
      cons: string[];
    };
  }>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Apply dark mode to document
    document.documentElement.classList.toggle('dark', darkMode);
    
    // Create stars
    const createStars = () => {
      const container = document.querySelector('.cosmic-bg');
      if (!container) return;
      
      // Clear existing stars
      const existingStars = container.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
      }
    };

    createStars();
  }, [darkMode]);

  const generateResponse = async (side: 'HEADS' | 'TAILS') => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      statement: `The cosmic forces align with ${side}, suggesting this path holds promising possibilities.`,
      pros: [
        'Alignment with your cosmic destiny',
        'Potential for extraordinary growth',
        'Universal energy supports this choice'
      ],
      cons: [
        'May require navigating through unknown territories',
        'Temporary cosmic disturbances possible',
        'Requires embracing uncertainty'
      ]
    };
  };

  const flipCoin = async () => {
    if (!question.trim()) return;
    
    setIsFlipping(true);
    setLoading(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 3000));
    const side = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
    
    const response = await generateResponse(side);
    
    setIsFlipping(false);
    setResult({ side, response });
    setLoading(false);
  };

  return (
    <div className={`cosmic-bg min-h-screen text-white relative overflow-hidden ${darkMode ? 'dark' : 'light'}`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center justify-between w-full mb-8">
            <div className="w-12"></div> {/* Spacer for centering */}
            <h1 className="text-5xl font-bold cosmic-text-rainbow flex items-center gap-3">
              <Planet className="w-10 h-10 orbiting" />
              DecisionCoin
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-opacity-20 bg-purple-500 hover:bg-opacity-30 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-6 h-6 text-yellow-300" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-12 floating">
          <div className="cosmic-border rounded-2xl p-1">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What cosmic decision awaits your judgment?"
              className="w-full p-6 rounded-xl bg-transparent text-white placeholder-purple-300 resize-none h-32 focus:outline-none"
            />
          </div>
        </div>

        {/* Coin Flip Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={flipCoin}
            disabled={!question.trim() || isFlipping}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white cosmic-border glow transform transition-all duration-300 ${
              isFlipping ? 'scale-95' : 'hover:scale-105'
            } ${
              !question.trim() || isFlipping
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:glow'
            }`}
          >
            <Rocket className={`w-6 h-6 ${isFlipping ? 'animate-spin' : ''}`} />
            Consult the Cosmos
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center floating">
            <Stars className="w-12 h-12 text-purple-400 animate-spin mx-auto" />
            <p className="mt-4 text-purple-300">Consulting the cosmic forces...</p>
          </div>
        )}

        {/* Result Section */}
        {result && (
          <div className="cosmic-border rounded-2xl p-8 backdrop-blur-lg">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold bg-purple-500 bg-opacity-20">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                {result.side}
              </span>
            </div>

            <p className="text-xl mb-8 text-center text-purple-200">{result.response.statement}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="cosmic-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-green-400 flex items-center gap-2">
                  <Planet className="w-5 h-5" /> Cosmic Advantages
                </h3>
                <ul className="space-y-3">
                  {result.response.pros.map((pro, index) => (
                    <li key={index} className="flex items-center gap-3 text-green-200">
                      <span className="text-green-400">✧</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="cosmic-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-red-400 flex items-center gap-2">
                  <Planet className="w-5 h-5" /> Cosmic Challenges
                </h3>
                <ul className="space-y-3">
                  {result.response.cons.map((con, index) => (
                    <li key={index} className="flex items-center gap-3 text-red-200">
                      <span className="text-red-400">✧</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 text-center text-lg text-purple-200 italic">
              Does this cosmic guidance resonate with your inner truth?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;