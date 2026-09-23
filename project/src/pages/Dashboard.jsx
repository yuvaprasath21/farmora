import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Leaf, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { WeatherWidget } from '../components/WeatherWidget';
import { MarketPrices } from '../components/MarketPrices';
import { GrowthAnalysis } from '../components/GrowthAnalysis';
import { FarmerNews } from '../components/FarmerNews';
import { DiseaseDetection } from '../components/DiseaseDetection';
export function Dashboard() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [farmStats, setFarmStats] = useState({
        totalCrops: 0,
        activeGrowth: 0,
        pendingHarvest: 0,
    });
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/');
                    return;
                }
                // Fetch user data from Supabase
                const { data: farms } = await supabase
                    .from('farms')
                    .select('*')
                    .eq('user_id', session.user.id);
                if (farms && farms.length > 0) {
                    const { data: crops } = await supabase
                        .from('crops')
                        .select('*')
                        .eq('farm_id', farms[0].id);
                    setFarmStats({
                        totalCrops: crops?.length || 0,
                        activeGrowth: crops?.filter(c => c.status === 'growing').length || 0,
                        pendingHarvest: crops?.filter(c => c.status === 'ready_for_harvest').length || 0,
                    });
                }
                setUserData({
                    username: session.user.user_metadata.username || 'Farmer',
                    farm_size: session.user.user_metadata.farm_size || '0',
                    location: session.user.user_metadata.location || 'Unknown',
                });
            }
            catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/');
            }
            finally {
                setLoading(false);
            }
        };
        checkAuth();
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                navigate('/');
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" }) }));
    }
    if (!userData) {
        return null;
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-8", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("div", { className: "bg-white rounded-lg shadow-lg p-6 mb-8", children: _jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-gray-800", children: ["Welcome back, ", userData.username, "!"] }), _jsxs("p", { className: "text-gray-600", children: ["Farm Size: ", userData.farm_size, " hectares | Location: ", userData.location] })] }), _jsx(Leaf, { className: "h-12 w-12 text-green-500" })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx("div", { className: "bg-white rounded-lg shadow-lg p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Total Crops" }), _jsx("h2", { className: "text-3xl font-bold text-gray-800", children: farmStats.totalCrops })] }), _jsx(BarChart3, { className: "h-8 w-8 text-green-500" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-lg p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Active Growth" }), _jsx("h2", { className: "text-3xl font-bold text-gray-800", children: farmStats.activeGrowth })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-blue-500" })] }) }), _jsx("div", { className: "bg-white rounded-lg shadow-lg p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Pending Harvest" }), _jsx("h2", { className: "text-3xl font-bold text-gray-800", children: farmStats.pendingHarvest })] }), _jsx(Users, { className: "h-8 w-8 text-yellow-500" })] }) })] }), _jsx("div", { className: "mb-8", children: _jsx(DiseaseDetection, {}) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "space-y-8", children: [_jsx(WeatherWidget, {}), _jsx(MarketPrices, {})] }), _jsxs("div", { className: "lg:col-span-2 space-y-8", children: [_jsx(GrowthAnalysis, {}), _jsx(FarmerNews, {})] })] }), _jsxs("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("button", { onClick: () => navigate('/crop-management'), className: "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 touch-manipulation", children: [_jsx(Leaf, { className: "h-5 w-5 text-green-500" }), _jsx("span", { children: "Manage Crops" })] }), _jsxs("button", { onClick: () => navigate('/team-collaboration'), className: "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 touch-manipulation", children: [_jsx(Users, { className: "h-5 w-5 text-blue-500" }), _jsx("span", { children: "Team Tasks" })] }), _jsxs("button", { onClick: () => navigate('/analytics'), className: "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 touch-manipulation", children: [_jsx(BarChart3, { className: "h-5 w-5 text-purple-500" }), _jsx("span", { children: "View Analytics" })] }), _jsxs("button", { onClick: () => navigate('/profile'), className: "bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition flex items-center justify-center space-x-2 touch-manipulation", children: [_jsx(Users, { className: "h-5 w-5 text-gray-500" }), _jsx("span", { children: "Edit Profile" })] })] })] }) }));
}
