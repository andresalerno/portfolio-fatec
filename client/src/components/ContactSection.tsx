import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

const CONTACT_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663663187057/JqJ8Db5KTYiptbb3HhHm5C/contact-section-bg-Jbex6M4kzEzUjWZqCD6BxL.webp';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'andresalerno22@gmail.com';
const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as { error?: string; success?: boolean } | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Nao foi possivel enviar sua mensagem agora.');
      }

      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData(initialFormData);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Nao foi possivel enviar sua mensagem agora.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/andresalerno/',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      href: 'https://github.com/andresalerno',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      href: 'https://wa.me/5511996000630',
    },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-32 overflow-hidden bg-gray-50">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${CONTACT_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#d4af37]"></div>
              <span className="text-[#d4af37] font-sans font-semibold text-sm uppercase tracking-wider">
                Contato
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#1a3a52] mb-6 leading-tight">
              Vamos
              <span className="text-[#d4af37]"> Conversar</span>
            </h2>

            <p className="text-gray-600 font-sans font-light text-lg leading-relaxed mb-8">
              Estou sempre aberto a novas oportunidades, colaborações e conversas interessantes. Sinta-se livre para entrar em contato através de qualquer um dos canais abaixo.
            </p>

            <div className="space-y-6 mb-12">
              <div>
                <h3 className="font-sans font-semibold text-[#2c3e50] mb-2">Email</h3>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-[#d4af37] hover:text-[#1a3a52] transition-all font-sans"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-[#2c3e50] mb-2">Localização</h3>
                <p className="text-gray-600 font-sans">São Paulo, Brasil</p>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-[#2c3e50] mb-2">Disponibilidade</h3>
                <p className="text-gray-600 font-sans">Disponível para projetos e consultoria</p>
              </div>
            </div>

            <div>
              <h3 className="font-sans font-semibold text-[#2c3e50] mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    title={link.label}
                    className="p-3 rounded-lg bg-white border border-gray-200 text-[#1a3a52] hover:text-[#d4af37] transition-all"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="name" className="block font-sans font-medium text-[#2c3e50] mb-2">
                  Nome Completo
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="font-sans border-gray-300 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-sans font-medium text-[#2c3e50] mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="font-sans border-gray-300 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-sans font-medium text-[#2c3e50] mb-2">
                  Assunto
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Qual é o assunto?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="font-sans border-gray-300 focus:border-[#d4af37] focus:ring-[#d4af37]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-sans font-medium text-[#2c3e50] mb-2">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Sua mensagem aqui..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="font-sans border-gray-300 focus:border-[#d4af37] focus:ring-[#d4af37] resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a3a52] hover:bg-[#2c3e50] text-white font-sans font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
