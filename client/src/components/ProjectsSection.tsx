import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const PROJECTS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663663187057/JqJ8Db5KTYiptbb3HhHm5C/projects-section-bg-NNt5WpHNvGWCMLtzjPtqVP.webp';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Finance' | 'Tech' | 'Hybrid';
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Dashboard de Análise Financeira',
    description: 'Plataforma interativa para análise de portfólio com visualizações em tempo real, alertas de risco e recomendações automáticas baseadas em IA.',
    category: 'Hybrid',
    technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL', 'D3.js'],
    links: { demo: '#', github: '#' },
  },
  {
    id: '2',
    title: 'API de Processamento de Dados',
    description: 'Serviço backend escalável para processamento de grandes volumes de dados financeiros com validação, transformação e armazenamento eficiente.',
    category: 'Tech',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
    links: { github: '#' },
  },
  {
    id: '3',
    title: 'Sistema de Gestão de Investimentos',
    description: 'Aplicação completa para gestão de carteira de investimentos com cálculo automático de retornos, análise de risco e relatórios personalizados.',
    category: 'Hybrid',
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Chart.js'],
    links: { demo: '#', github: '#' },
  },
  {
    id: '4',
    title: 'Automação de Relatórios',
    description: 'Sistema de automação que gera relatórios financeiros complexos em múltiplos formatos, economizando 40 horas/mês de trabalho manual.',
    category: 'Finance',
    technologies: ['Python', 'Pandas', 'Excel', 'Scheduled Tasks', 'Email API'],
    links: { github: '#' },
  },
  {
    id: '5',
    title: 'Plataforma de Educação Financeira',
    description: 'Aplicação web educacional com cursos interativos, simuladores de investimento e comunidade de usuários para aprender sobre finanças pessoais.',
    category: 'Hybrid',
    technologies: ['React', 'Next.js', 'Firebase', 'Stripe', 'TypeScript'],
    links: { demo: '#', github: '#' },
  },
  {
    id: '6',
    title: 'Integração com APIs Financeiras',
    description: 'Middleware que integra múltiplas APIs de brokers e exchanges, consolidando dados e fornecendo interface unificada para operações.',
    category: 'Tech',
    technologies: ['Node.js', 'REST APIs', 'WebSockets', 'PostgreSQL', 'AWS'],
    links: { github: '#' },
  },
];

const categoryColors = {
  Finance: 'from-blue-500 to-blue-600',
  Tech: 'from-emerald-500 to-emerald-600',
  Hybrid: 'from-purple-500 to-purple-600',
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `url(${PROJECTS_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#d4af37]"></div>
            <span className="text-[#d4af37] font-sans font-semibold text-sm uppercase tracking-wider">
              Portfólio
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a3a52] mb-6 leading-tight">
            Projetos
            <span className="text-[#d4af37]"> Destacados</span>
          </h2>

          <p className="text-gray-600 font-sans font-light text-lg leading-relaxed">
            Uma seleção de projetos que demonstram a combinação de expertise em finanças e desenvolvimento de software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border border-gray-200 hover:shadow-xl transition-all hover:scale-105 bg-white"
            >
              <div
                className={`h-1 w-full bg-gradient-to-r ${categoryColors[project.category]}`}
              ></div>

              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold text-white bg-gradient-to-r ${categoryColors[project.category]}`}
                  >
                    {project.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#1a3a52] mb-3 group-hover:text-[#d4af37] transition-all">
                  {project.title}
                </h3>

                <p className="text-gray-600 font-sans font-light text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 font-sans text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  {project.links.demo && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#d4af37] hover:text-[#1a3a52] font-sans font-medium flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#d4af37] hover:text-[#1a3a52] font-sans font-medium flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 font-sans font-light text-lg mb-6">
            Quer ver mais projetos ou discutir uma colaboração?
          </p>
          <Button className="bg-[#1a3a52] hover:bg-[#2c3e50] text-white font-sans font-medium px-8 py-6 rounded-lg transition-all">
            Vamos Conversar
          </Button>
        </div>
      </div>
    </section>
  );
}
