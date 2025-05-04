import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Search, User, Menu, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useMovies } from '../../context/MovieContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { searchMovies } = useMovies();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchMovies(searchQuery);
      if (location.pathname !== '/discover') {
        // Ideally we'd navigate here, but for demo we'll just log
        console.log('Navigating to discover page with search:', searchQuery);
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? 'bg-background shadow-lg' : 'bg-gradient-to-b from-background to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Film className="text-primary w-8 h-8" />
            <span className="font-display text-2xl font-bold">CineVerse</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-text hover:text-primary transition-colors">Home</Link>
            <Link to="/discover" className="text-text hover:text-primary transition-colors">Discover</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-background-light/80 backdrop-blur-sm"
                leftIcon={<Search className="w-4 h-4" />}
              />
            </form>
            <Link to="/profile">
              <Button 
                variant="outline" 
                size="sm"
                leftIcon={<User className="w-4 h-4" />}
              >
                Profile
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-text"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4">
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                leftIcon={<Search className="w-4 h-4" />}
              />
            </form>
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-text hover:text-primary py-2 transition-colors">Home</Link>
              <Link to="/discover" className="text-text hover:text-primary py-2 transition-colors">Discover</Link>
              <Link to="/profile" className="text-text hover:text-primary py-2 transition-colors">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};