'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para detectar o scroll e alterar o header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para animações de entrada ao rolar
  useEffect(() => {
    const sections = document.querySelectorAll(".scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in-up");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full bg-white shadow-md z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"
          }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png" // Placeholder local
              alt="Free Fire Future Logo"
              width={isScrolled ? 30 : 40}
              height={isScrolled ? 30 : 40}
              priority
              className="rounded-full transition-all duration-300"
            />
            <h1
              className={`font-bold text-blue-600 transition-all duration-300 ${isScrolled ? "hidden" : "text-2xl"
                }`}
            >
              Free Fire Hub
            </h1>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            {isScrolled ? (
              <>
                <a href="#inicio" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
                  </svg>
                </a>
                <a href="#noticias" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </a>
                <a href="#atualizacoes" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9H20V4m-16 16h5m-5-5h5" />
                  </svg>
                </a>
                <a href="#como-jogar" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a href="#dicas" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
                <a href="#promocoes" className="text-gray-700 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-3 9a3 3 0 11-6 0 3 3 0 016 0zm9-9a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              </>
            ) : (
              <>
                <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Início</a>
                <a href="#noticias" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Notícias</a>
                <a href="#atualizacoes" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Atualizações</a>
                <a href="#como-jogar" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Como Jogar</a>
                <a href="#dicas" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Dicas</a>
                <a href="#promocoes" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-semibold">Promoções</a>
              </>
            )}
          </div>
          <button className="md:hidden text-gray-700 hover:text-blue-600">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-orange-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-blue-600">
              Free Fire 2050: O Futuro Chegou!
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto md:mx-0">
              Explore o universo avançado do Free Fire com notícias, dicas e promoções exclusivas!
            </p>
            <a
              href="#promocoes"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 animate-bounce"
            >
              Veja as Ofertas
            </a>
          </div>
          <div className="flex-1">
            <Image
              src="/teste.png" // Placeholder local
              alt="Free Fire 2050 Gameplay"
              width={600}
              height={400}
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </section>

      {/* Notícias Section */}
      <section id="noticias" className="py-16 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Notícias em Destaque</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Notícia 1"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Evento Cyber 2050</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Skins holográficas e recompensas exclusivas no evento do futuro!
                </p>
                <a href="#" className="text-blue-600 hover:underline font-medium">Leia mais</a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Notícia 2"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Atualização Quantum</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Mapas flutuantes e armas de plasma chegam em breve!
                </p>
                <a href="#" className="text-blue-600 hover:underline font-medium">Leia mais</a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Notícia 3"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Torneio Holo-World</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Participe do campeonato global com prêmios incríveis!
                </p>
                <a href="#" className="text-blue-600 hover:underline font-medium">Leia mais</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atualizações Section */}
      <section id="atualizacoes" className="py-16 bg-gray-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Atualizações Recentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Update 1"
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Skin Holo-Dragon</h3>
                <p className="text-gray-600">Nova skin lendária com efeitos futuristas!</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Update 2"
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Modo Gravidade Zero</h3>
                <p className="text-gray-600">Batalhas em órbita já estão disponíveis!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Jogar Section */}
      <section id="como-jogar" className="py-16 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Como Jogar Free Fire 2050</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">1. Conecte-se</h3>
              <p className="text-gray-600 text-sm">Escolha avatares com IA para habilidades únicas.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">2. Explore Mapas</h3>
              <p className="text-gray-600 text-sm">Navegue por cidades flutuantes e ruínas cybernéticas.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">3. Domine a Tech</h3>
              <p className="text-gray-600 text-sm">Use drones e armas de energia para vencer!</p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Guia Completo
            </a>
          </div>
        </div>
      </section>

      {/* Dicas Section */}
      <section id="dicas" className="py-16 bg-gray-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Dicas para Vencer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Aterrisagem</h3>
              <p className="text-gray-600 text-sm">Use portais para evitar zonas lotadas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Armas</h3>
              <p className="text-gray-600 text-sm">Prefira rifles de plasma em combates.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Mobilidade</h3>
              <p className="text-gray-600 text-sm">Aproveite jetpacks para escapar rápido.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Endgame</h3>
              <p className="text-gray-600 text-sm">Hackeie a zona para vantagens finais.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promoções Section */}
      <section id="promocoes" className="py-16 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">Promoções Exclusivas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Promo 1"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Pacote Cyber-Diamantes</h3>
                <p className="text-gray-600 text-sm mb-4">1000 diamantes + skin holo por R$49,90!</p>
                <a
                  href="#"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Comprar
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Promo 2"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Skin Grátis 2050</h3>
                <p className="text-gray-600 text-sm mb-4">Código "CYBERFF" para skin surpresa!</p>
                <a
                  href="#"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Resgatar
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <Image
                src="/teste.png" // Placeholder local
                alt="Promo 3"
                width={400}
                height={200}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Passe Quantum</h3>
                <p className="text-gray-600 text-sm mb-4">30% off no Passe de Elite futurista!</p>
                <a
                  href="#"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                >
                  Comprar
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Free Fire Hub</h3>
              <p className="text-gray-400 text-sm">O seu destino para tudo sobre Free Fire 2050.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Links Rápidos</h3>
              <div className="flex flex-col gap-2">
                <a href="#noticias" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Notícias</a>
                <a href="#dicas" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Dicas</a>
                <a href="#promocoes" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Promoções</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Siga-nos</h3>
              <div className="flex gap-6 justify-center md:justify-start">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">YouTube</a>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center mt-8">© 2025 Free Fire Hub. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slide-in-up { animation: slideInUp 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.6s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.6s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.5s ease-out forwards; }
        .animate-bounce { animation: bounce 1.5s infinite ease-in-out; }
        .animate-pulse { animation: pulse 2s infinite; }

        .scroll-reveal { opacity: 0; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}