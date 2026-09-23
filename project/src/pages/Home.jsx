import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane as Plant, Users, BarChart3, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../components/SearchBar';
import { WeatherWidget } from '../components/WeatherWidget';
import { MarketPrices } from '../components/MarketPrices';
import { GrowthAnalysis } from '../components/GrowthAnalysis';
import { FarmMap } from '../components/FarmMap';
import { supabase } from '../lib/supabase';
function FeatureCard({ icon, title, description, onClick }) {
    return (_jsxs("div", { className: "bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer", onClick: onClick, children: [_jsx("div", { className: "mb-4", children: icon }), _jsx("h3", { className: "text-xl font-semibold mb-3", children: title }), _jsx("p", { className: "text-gray-600", children: description })] }));
}
export function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const handleGetStarted = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            // If user is logged in, navigate to profile
            navigate('/profile');
        }
        else {
            // If user is not logged in, navigate to features page
            navigate('/signup');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "relative h-screen", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80", alt: "Sustainable farming", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black bg-opacity-50" })] }), _jsx("div", { className: "relative z-10 container mx-auto px-6 h-[calc(100vh-5rem)] flex items-center", children: _jsxs("div", { className: "max-w-2xl", children: [_jsx("h1", { className: "text-5xl md:text-6xl font-bold text-white mb-6", children: t('hero.title') }), _jsx("p", { className: "text-xl text-gray-200 mb-8", children: t('hero.description') }), _jsxs("div", { className: "space-y-4", children: [_jsx(SearchBar, {}), _jsxs("button", { onClick: handleGetStarted, className: "bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition flex items-center", children: [t('hero.button'), " ", _jsx(ArrowRight, { className: "ml-2 h-5 w-5" })] })] })] }) })] }), _jsx("section", { className: "py-20", children: _jsx("div", { className: "container mx-auto px-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(FarmMap, {}) }), _jsx("div", { children: _jsx(WeatherWidget, {}) }), _jsx("div", { children: _jsx(MarketPrices, {}) }), _jsx("div", { className: "lg:col-span-2", children: _jsx(GrowthAnalysis, {}) })] }) }) }), _jsx("section", { className: "py-20 bg-white", children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsx("h2", { className: "text-4xl font-bold text-center mb-16", children: t('features.title') }), _jsxs("div", { className: "grid md:grid-cols-3 gap-12", children: [_jsx(FeatureCard, { icon: _jsx(Plant, { className: "h-8 w-8 text-green-500" }), title: t('features.crop.title'), description: t('features.crop.description'), onClick: () => navigate('/crop-management') }), _jsx(FeatureCard, { icon: _jsx(Users, { className: "h-8 w-8 text-green-500" }), title: t('features.team.title'), description: t('features.team.description'), onClick: () => navigate('/team-collaboration') }), _jsx(FeatureCard, { icon: _jsx(BarChart3, { className: "h-8 w-8 text-green-500" }), title: t('features.analytics.title'), description: t('features.analytics.description'), onClick: () => navigate('/analytics') })] })] }) }), _jsx("section", { className: "bg-green-600 py-20", children: _jsxs("div", { className: "container mx-auto px-6 text-center", children: [_jsx("h2", { className: "text-4xl font-bold text-white mb-6", children: t('cta.title') }), _jsx("p", { className: "text-green-100 mb-8 max-w-2xl mx-auto", children: t('cta.description') }), _jsx("button", { onClick: handleGetStarted, className: "bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition", children: t('cta.button') })] }) })] }));
}
