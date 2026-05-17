/**
 * Footer Component - Data Elegance Design
 * Minimalist footer with copyright and navigation links
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Sobre', href: '#about' },
    { label: 'Habilidades', href: '#skills' },
    { label: 'Projetos', href: '#projects' },
    { label: 'Contato', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-steel-blue text-white py-12 border-t border-gold/20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-steel-blue font-display font-bold text-sm">FT</span>
              </div>
              <span className="font-display font-bold text-lg">Portfolio</span>
            </div>
            <p className="text-gray-300 font-sans font-light text-sm">
              Profissional com expertise em finanças e desenvolvimento de software.
            </p>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-gray-300 hover:text-gold transition-smooth font-sans text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300 font-sans text-sm">
              <li>
                <a href="mailto:seu.email@exemplo.com" className="hover:text-gold transition-smooth">
                  seu.email@exemplo.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-smooth">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-smooth">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 font-sans text-sm">
          <p>
            © {currentYear} Portfólio Profissional. Todos os direitos reservados.
          </p>
          <p className="text-gold font-medium">
            Desenvolvido com <span className="text-red-400">♥</span> usando React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
