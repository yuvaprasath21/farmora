import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, RefreshCcw, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchMarketPrices } from '../services/marketPrices';
export function MarketPrices() {
    const { t } = useTranslation();
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const loadMarketPrices = async (showRefresh = false) => {
        try {
            if (showRefresh) {
                setIsRefreshing(true);
            }
            else {
                setLoading(true);
            }
            setError(null);
            const data = await fetchMarketPrices();
            setPrices(data);
            setLastUpdated(new Date());
        }
        catch (err) {
            console.error('Error loading market prices:', err);
            setError('Could not load market prices. Please try again later.');
        }
        finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };
    useEffect(() => {
        loadMarketPrices();
        // Refresh prices every 5 minutes
        const interval = setInterval(() => loadMarketPrices(true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);
    const formatPrice = (price, unit) => {
        return `₹${price}/${unit}`;
    };
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("h3", { className: "text-xl font-semibold mb-6", children: t('market.title') }), _jsx("div", { className: "space-y-4", children: [1, 2, 3, 4].map((i) => (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded w-3/4 mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" })] }, i))) })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold", children: t('market.title') }), _jsx("button", { onClick: () => loadMarketPrices(true), className: `text-gray-600 hover:text-gray-900 transition ${isRefreshing ? 'animate-spin' : ''}`, disabled: isRefreshing, title: "Refresh prices", children: _jsx(RefreshCcw, { className: "h-5 w-5" }) })] }), error ? (_jsxs("div", { className: "flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg mb-4", children: [_jsx(AlertCircle, { className: "h-5 w-5 flex-shrink-0" }), _jsx("p", { children: error })] })) : null, prices.length === 0 && !error ? (_jsx("p", { className: "text-gray-500 text-center py-4", children: "No market prices available" })) : (_jsx("div", { className: "space-y-4", children: prices.map((item, index) => (_jsxs("div", { className: "flex items-center justify-between border-b pb-3 last:border-0 last:pb-0", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: item.crop_name }), _jsx("p", { className: "text-sm text-gray-600", children: item.market_location })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "font-medium", children: formatPrice(item.price_per_unit, item.unit) }), item.trend === 'up' ? (_jsx(TrendingUp, { className: "h-4 w-4 text-green-500" })) : item.trend === 'down' ? (_jsx(TrendingDown, { className: "h-4 w-4 text-red-500" })) : (_jsx("div", { className: "h-4 w-4 rounded-full bg-gray-200" }))] })] }, `${item.crop_name}-${item.market_location}-${index}`))) })), lastUpdated && (_jsxs("p", { className: "text-sm text-gray-500 mt-4", children: ["Last updated: ", lastUpdated.toLocaleTimeString()] }))] }));
}
