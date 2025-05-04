import React from 'react';
import { Film, Github, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Film className="text-primary w-6 h-6" />
              <span className="font-display text-xl font-bold">CineVerse</span>
            </div>
            <p className="text-text-secondary mb-4">
              Your ultimate movie discovery platform. Find, save, and enjoy the best films tailored to your taste.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/discover" className="text-text-secondary hover:text-primary transition-colors">Discover</Link>
              </li>
              <li>
                <Link to="/profile" className="text-text-secondary hover:text-primary transition-colors">Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Action</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Comedy</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Drama</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Sci-Fi</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Horror</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-text-secondary">
          <p>&copy; {new Date().getFullYear()} CineVerse. All rights reserved.</p>
          <p className="mt-2 text-sm">This is a demo application. Not for commercial use.</p>
        </div>
      </div>
    </footer>
  );
};