import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const PublicNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'Sobre' },
        { to: '/contato', label: 'Contato' }, // link novo
        { to: '/login', label: 'Login' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-[#cfcbc4] backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo + Nome do sistema */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <div className="relative">
                            <img
                                src="/logo.webp"
                                alt="Sistema Harmonia"
                                className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl"
                            />
                            <div className="absolute -inset-1 bg-gradient-to-r from-background to-accent rounded-lg md:rounded-xl blur opacity-30"></div>
                        </div>
                        <div>
                            <span
                                className="text-xl md:text-2xl font-bold text-dark"
                                style={{ fontFamily: '"Libre Baskerville", serif' }}
                            >
                                Sistema Harmonia
                            </span>
                            <p
                                className="text-xs text-dark font-medium hidden sm:block md:text-2xl"
                                style={{ fontFamily: '"Libre Baskerville", serif' }}
                            >
                                Sistema Psicológico
                            </p>
                        </div>
                    </div>

                    {/* Links para desktop */}
                    <div
                        className="hidden sm:flex items-center space-x-6 font md:text-2xl"
                        style={{ fontFamily: '"Libre Baskerville", serif' }}
                    >
                        {navLinks.slice(0, -1).map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-medium transition-colors text-sm md:text-base ${isActive(link.to) ? 'text-black' : 'text-dark'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Botão Login */}
                        <Link to="/login" className="font-medium text-black md:text-base">
                            <button className="px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                                <span className="hidden sm:inline">Login</span>
                                <span className="sm:hidden">Entrar</span>
                            </button>
                        </Link>
                    </div>

                    {/* Botão de abrir/fechar menu mobile */}
                    <div className="md:hidden flex items-center ml-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-dark/70 hover:text-light"
                            aria-label="Menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isOpen && (
                    <div className="md:hidden mt-4">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-md rounded-lg">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`block px-3 py-2 rounded-lg transition-colors ${isActive(link.to)
                                            ? 'text-light bg-light/10 font-medium'
                                            : 'text-dark/70 hover:text-accent hover:bg-light/5'
                                        }`}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontFamily: '"Libre Baskerville", serif' }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
