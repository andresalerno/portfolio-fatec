import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Header Component - Data Elegance Design
 * Minimalist navigation with smooth transitions and gold accents
 * Responsive mobile menu with elegant animations
 */

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Sobre', href: '#about' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Contato', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-smooth">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-steel-blue to-gold rounded-lg flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">FT</span>
          </div>
          <span className="font-display font-bold text-steel-blue hidden sm:inline">Portfolio</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-dark-gray font-sans font-medium text-sm hover:text-gold transition-smooth relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-smooth"></span>
            </button>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <Button
            onClick={() => handleNavClick('#contact')}
            className="bg-steel-blue hover:bg-dark-gray text-white font-sans font-medium transition-smooth"
          >
            Vamos Conversar
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-steel-blue" />
          ) : (
            <Menu className="w-5 h-5 text-steel-blue" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white animate-in fade-in slide-in-from-top-2">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-dark-gray font-sans font-medium hover:text-gold transition-smooth py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick('#contact')}
              className="w-full bg-steel-blue hover:bg-dark-gray text-white font-sans font-medium transition-smooth"
            >
              Vamos Conversar
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
