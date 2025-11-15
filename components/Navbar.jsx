import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Bell, User } from 'lucide-react';

export default function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
            isScrolled ? 'shadow-xl' : ''
          }`}>
            <div className="flex items-center justify-between px-6 py-4">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-xl backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:block">GlassNav</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-2">
                <button className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:block">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:block">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hidden sm:block">
                  <User className="w-5 h-5" />
                </button>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 md:hidden"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-white/20 px-6 py-4 space-y-2">
                {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    {item}
                  </a>
                ))}
                <div className="flex items-center space-x-2 pt-2 border-t border-white/20">
                  <button className="flex-1 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="flex-1 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="flex-1 p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="pt-32 px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold">
            Glassmorphism
          </h1>
          <p className="text-xl md:text-2xl text-white/80">
            Scroll down to see the navbar effect
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
                <p className="text-white/70">Beautiful glass effect with modern design</p>
              </div>
            ))}
          </div>
          <div className="h-screen"></div>
        </div>
      </div>
    </div>
  );
}