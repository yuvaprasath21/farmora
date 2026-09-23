import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, } from 'react-router-dom';
import { Leaf, Menu, X, } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';
import { CropManagement } from './pages/CropManagement';
import { TeamCollaboration } from './pages/TeamCollaboration';
import { Analytics } from './pages/Analytics';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { UserProfile } from './pages/UserProfile';
import { Features } from './pages/Features';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
function AuthModalWrapper() {
    const navigate = useNavigate();
    return _jsx(AuthModal, { isOpen: true, onClose: () => navigate('/') });
}
function App() {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => subscription.unsubscribe();
    }, []);
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsMobileMenuOpen(false);
    };
    const handleGetStarted = () => {
        if (!user) {
            setIsAuthModalOpen(true);
        }
        else {
            window.location.href = '/dashboard';
        }
        setIsMobileMenuOpen(false);
    };
    const NavLinks = () => (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/", className: "hover:text-green-400 transition", onClick: () => setIsMobileMenuOpen(false), children: t('nav.home') }), _jsx(Link, { to: "/features", className: "hover:text-green-400 transition", onClick: () => setIsMobileMenuOpen(false), children: t('nav.features') }), _jsx(Link, { to: "/about", className: "hover:text-green-400 transition", onClick: () => setIsMobileMenuOpen(false), children: t('nav.about') }), _jsx(Link, { to: "/contact", className: "hover:text-green-400 transition", onClick: () => setIsMobileMenuOpen(false), children: t('nav.contact') }), _jsx("div", { className: "md:hidden", children: _jsx(LanguageSwitcher, {}) }), user ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/dashboard", className: "hover:text-green-400 transition", onClick: () => setIsMobileMenuOpen(false), children: "Dashboard" }), _jsx("button", { onClick: handleLogout, className: "hover:text-green-400 transition", children: t('nav.logout') })] })) : (_jsx("button", { onClick: () => {
                    setIsAuthModalOpen(true);
                    setIsMobileMenuOpen(false);
                }, className: "hover:text-green-400 transition", children: t('nav.login') }))] }));
    return (_jsx(Router, { children: _jsxs("div", { className: "min-h-screen bg-gray-50", children: [_jsx("nav", { className: "bg-white shadow-lg sticky top-0 z-50", children: _jsxs("div", { className: "container mx-auto px-4 py-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx(Leaf, { className: "h-8 w-8 text-green-400" }), _jsx("span", { className: "text-2xl font-bold text-gray-800", children: "Farmora" })] }), _jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [_jsx(NavLinks, {}), _jsx("div", { className: "hidden md:block", children: _jsx(LanguageSwitcher, {}) })] }), _jsx("div", { className: "flex items-center space-x-4 md:hidden", children: _jsx("button", { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "text-gray-600 hover:text-gray-900", children: isMobileMenuOpen ? (_jsx(X, { className: "h-6 w-6" })) : (_jsx(Menu, { className: "h-6 w-6" })) }) }), _jsx("button", { onClick: handleGetStarted, className: "bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition hidden md:block", children: t('nav.getStarted') })] }), isMobileMenuOpen && (_jsxs("div", { className: "md:hidden mt-4 py-4 border-t space-y-4", children: [_jsx("div", { className: "flex flex-col space-y-4", children: _jsx(NavLinks, {}) }), _jsx("button", { onClick: handleGetStarted, className: "w-full bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition", children: t('nav.getStarted') })] }))] }) }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/features", element: _jsx(Features, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/profile", element: _jsx(UserProfile, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/crop-management", element: _jsx(CropManagement, {}) }), _jsx(Route, { path: "/team-collaboration", element: _jsx(TeamCollaboration, {}) }), _jsx(Route, { path: "/analytics", element: _jsx(Analytics, {}) }), _jsx(Route, { path: "/signup", element: _jsx(AuthModalWrapper, {}) })] }), _jsx(AuthModal, { isOpen: isAuthModalOpen, onClose: () => setIsAuthModalOpen(false) })] }) }));
}
export default App;
