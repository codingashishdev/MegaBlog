import React, { useState, useEffect } from "react";
import Logo from "../Logo.jsx";
import LogoutBtn from "./LogoutBtn.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Add scroll effect to header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Logo width="40px" height="40px"/>
                            <span className="font-bold text-xl hidden sm:block text-indigo-900">MegaBlog</span>
                        </Link>
                    </div>
                    
                    {/* Desktop navigation */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="flex space-x-1">
                            {navItems.map(item => item.active && (
                                <Link
                                    key={item.name}
                                    to={item.slug}
                                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors
                                        text-indigo-800 hover:bg-indigo-100 hover:text-indigo-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                            {authStatus && (
                                <div className="ml-2">
                                    <LogoutBtn />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-indigo-700 
                                hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg 
                                    className="h-6 w-6" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg 
                                    className="h-6 w-6" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu, show/hide based on menu state */}
            {isMenuOpen && (
                <div className="sm:hidden bg-white/95 backdrop-blur-sm shadow-lg rounded-b-lg border-t border-indigo-100">
                    <div className="pt-2 pb-3 space-y-1">
                        {navItems.map(item => item.active && (
                            <Link
                                key={item.name}
                                to={item.slug}
                                className="block px-4 py-2 text-base font-medium text-indigo-800 hover:bg-indigo-50 hover:text-indigo-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {authStatus && (
                            <div className="px-4 py-2">
                                <LogoutBtn />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
