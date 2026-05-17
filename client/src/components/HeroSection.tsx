import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * Hero Section - Data Elegance Design
 * Premium hero with background image, elegant typography, and clear CTA
 * Represents the bridge between finance and technology
 */

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663663187057/JqJ8Db5KTYiptbb3HhHm5C/hero-finance-tech-RPzuxoYmcBEZLLsH8hkQyd.webp';

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-steel-blue/40 to-transparent"></div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gold"></div>
            <span className="text-gold font-sans font-semibold text-sm uppercase tracking-wider">
              Bem-vindo ao meu portfólio
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Finanças &
            <span className="block text-gold">Tecnologia</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-100 font-sans font-light mb-8 leading-relaxed max-w-xl">
            Profissional com expertise em análise financeira e desenvolvimento de software. Transformando dados em insights e ideias em soluções.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => handleScroll('#projects')}
              className="bg-gold hover:bg-gold/90 text-steel-blue font-sans font-semibold px-8 py-6 rounded-lg transition-smooth flex items-center justify-center gap-2"
            >
              Ver Projetos
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleScroll('#contact')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-sans font-semibold px-8 py-6 rounded-lg transition-smooth"
            >
              Entrar em Contato
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-12 border-t border-white/20 grid grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-display font-bold text-gold mb-2">10+</div>
              <p className="text-sm text-gray-200 font-sans">Anos de Experiência</p>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-gold mb-2">50+</div>
              <p className="text-sm text-gray-200 font-sans">Projetos Concluídos</p>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-gold mb-2">100%</div>
              <p className="text-sm text-gray-200 font-sans">Satisfação do Cliente</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white text-xs font-sans uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
