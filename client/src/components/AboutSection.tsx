import { Card } from '@/components/ui/card';

/**
 * About Section - Data Elegance Design
 * Tells the story of transition from finance to tech
 * Asymmetric layout with background image and content cards
 */

const ABOUT_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663663187057/JqJ8Db5KTYiptbb3HhHm5C/about-section-bg-np6ecYidyYhSdhQCn3zDpJ.webp';

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${ABOUT_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold font-sans font-semibold text-sm uppercase tracking-wider">Sobre Mim</span>
              <div className="w-8 h-0.5 bg-gold"></div>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-steel-blue mb-6 leading-tight">
              Uma Jornada Entre
              <span className="text-gold"> Dois Mundos</span>
            </h2>

            <p className="text-gray-600 font-sans font-light text-lg leading-relaxed mb-6">
              Comecei minha carreira no mercado financeiro, onde desenvolvi uma compreensão profunda de análise de dados, gestão de riscos e estratégias de investimento. Essa experiência me deu uma perspectiva única sobre como os negócios funcionam.
            </p>

            <p className="text-gray-600 font-sans font-light text-lg leading-relaxed mb-8">
              Mas minha paixão por resolver problemas através da tecnologia me levou a aprender programação. Hoje, combino essas duas expertises para criar soluções inovadoras que conectam dados financeiros com aplicações práticas.
            </p>

            <div className="space-y-4">
              {[
                'Análise Financeira & Modelagem de Dados',
                'Desenvolvimento Full-Stack (React, TypeScript, Node.js)',
                'Automação de Processos & APIs',
                'Gestão de Projetos Ágeis',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0"></div>
                  <span className="text-dark-gray font-sans font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-smooth">
              <div className="text-4xl font-display font-bold text-gold mb-2">10+</div>
              <p className="text-gray-600 font-sans text-sm">Anos em Finanças</p>
            </Card>

            <Card className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-smooth">
              <div className="text-4xl font-display font-bold text-gold mb-2">5+</div>
              <p className="text-gray-600 font-sans text-sm">Anos em Tecnologia</p>
            </Card>

            <Card className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-smooth">
              <div className="text-4xl font-display font-bold text-gold mb-2">50+</div>
              <p className="text-gray-600 font-sans text-sm">Projetos Entregues</p>
            </Card>

            <Card className="p-8 bg-white border border-gray-200 hover:shadow-lg transition-smooth">
              <div className="text-4xl font-display font-bold text-gold mb-2">100%</div>
              <p className="text-gray-600 font-sans text-sm">Satisfação Clientes</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-20 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
    </section>
  );
}
