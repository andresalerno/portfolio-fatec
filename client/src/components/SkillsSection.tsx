import { Card } from '@/components/ui/card';
import { TrendingUp, Code2, BarChart3, Zap } from 'lucide-react';

const SKILLS_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663663187057/JqJ8Db5KTYiptbb3HhHm5C/skills-section-bg-m2WGfji7jBPn8Mbw62czoP.webp';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Finanças',
    icon: <TrendingUp className="w-6 h-6" />,
    skills: [
      'Análise Financeira',
      'Modelagem de Dados',
      'Gestão de Riscos',
      'Valuation',
      'Planejamento Estratégico',
      'Relatórios Executivos',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Desenvolvimento',
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      'React & TypeScript',
      'Node.js & Express',
      'Full-Stack Development',
      'API REST & GraphQL',
      'Banco de Dados',
      'DevOps & CI/CD',
    ],
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Dados & Analytics',
    icon: <BarChart3 className="w-6 h-6" />,
    skills: [
      'Python & Pandas',
      'SQL Avançado',
      'Visualização de Dados',
      'Machine Learning',
      'Business Intelligence',
      'ETL Processes',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Ferramentas & Métodos',
    icon: <Zap className="w-6 h-6" />,
    skills: [
      'Git & GitHub',
      'Agile & Scrum',
      'Docker & Kubernetes',
      'AWS & Cloud',
      'Jira & Confluence',
      'Testing & QA',
    ],
    color: 'from-orange-500 to-orange-600',
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${SKILLS_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container relative z-10">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-[#d4af37]"></div>
            <span className="text-[#d4af37] font-sans font-semibold text-sm uppercase tracking-wider">
              Competências
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a3a52] mb-6 leading-tight">
            Expertise em
            <span className="text-[#d4af37]"> Finanças & Tech</span>
          </h2>

          <p className="text-gray-600 font-sans font-light text-lg leading-relaxed">
            Uma combinação única de habilidades que permite criar soluções inovadoras na interseção entre finanças e tecnologia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-8 bg-white border border-gray-200 hover:shadow-xl transition-all hover:scale-105 group cursor-default"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-all`}
              >
                {category.icon}
              </div>

              <h3 className="font-display font-bold text-lg text-[#1a3a52] mb-4">
                {category.title}
              </h3>

              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li
                    key={skillIndex}
                    className="flex items-center gap-2 text-gray-600 font-sans text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-20 pt-16 border-t border-gray-200">
          <h3 className="font-display text-2xl font-bold text-[#1a3a52] mb-8">
            Nível de Proficiência
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { label: 'React & TypeScript', level: 95 },
              { label: 'Python & Data Analysis', level: 90 },
              { label: 'Financial Analysis', level: 92 },
              { label: 'Node.js & Backend', level: 88 },
              { label: 'SQL & Databases', level: 91 },
              { label: 'Cloud & DevOps', level: 85 },
            ].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-sans font-medium text-[#2c3e50]">{skill.label}</span>
                  <span className="text-[#d4af37] font-sans font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#1a3a52] to-[#d4af37] transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
