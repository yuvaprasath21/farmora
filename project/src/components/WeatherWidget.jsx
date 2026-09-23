import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { Cloud, Sun, Droplets, Wind, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function WeatherWidget() {
    const { t } = useTranslation();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if (!import.meta.env.VITE_WEATHER_API_KEY) {
                    throw new Error('Weather API key is not configured');
                }
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=11.12&lon=78.65&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`);
                if (!response.ok) {
                    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setWeather(data);
                setError(null);
                setRetryCount(0);
            }
            catch (err) {
                console.error('Error fetching weather:', err);
                setError(err instanceof Error ? err.message : 'Could not load weather data');
                // Retry logic for temporary failures
                if (retryCount < 3) {
                    setTimeout(() => {
                        setRetryCount(prev => prev + 1);
                    }, 5000 * (retryCount + 1)); // Exponential backoff
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchWeather();
        // Refresh weather data every 5 minutes
        const interval = setInterval(fetchWeather, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [retryCount]);
    if (loading) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(Sun, { className: "h-6 w-6 text-yellow-500 mr-2" }), t('weather.title')] }), _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-2/3" })] })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(Sun, { className: "h-6 w-6 text-yellow-500 mr-2" }), t('weather.title')] }), _jsxs("div", { className: "flex items-center gap-2 text-red-600", children: [_jsx(AlertCircle, { className: "h-5 w-5" }), _jsx("p", { children: error })] }), retryCount < 3 && (_jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Retrying..." }))] }));
    }
    if (!weather) {
        return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(Sun, { className: "h-6 w-6 text-yellow-500 mr-2" }), t('weather.title')] }), _jsx("p", { className: "text-gray-500", children: "No weather data available" })] }));
    }
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(Sun, { className: "h-6 w-6 text-yellow-500 mr-2" }), t('weather.title')] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Cloud, { className: "h-5 w-5 text-gray-600 mr-2" }), _jsxs("span", { children: [Math.round(weather.main.temp), "\u00B0C"] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Droplets, { className: "h-5 w-5 text-blue-500 mr-2" }), _jsxs("span", { children: [weather.main.humidity, "%"] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Wind, { className: "h-5 w-5 text-gray-600 mr-2" }), _jsxs("span", { children: [Math.round(weather.wind.speed * 3.6), " km/h"] })] }), _jsxs("div", { className: "flex items-center", children: [_jsx(Sun, { className: "h-5 w-5 text-yellow-500 mr-2" }), _jsx("span", { className: "capitalize", children: weather.weather[0].description })] })] })] }));
}
