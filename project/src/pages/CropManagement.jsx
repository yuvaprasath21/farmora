import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plane as Plant, Droplets, Sun, Wind, Sprout } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const cropData = {
    rice: {
        name: 'Rice',
        description: 'Rice is a staple food crop that requires careful water management and warm temperatures.',
        growthPeriod: '120-150 days',
        waterNeeds: 'High - Requires flooding',
        temperature: '20-35°C',
        soil: 'Clay or clay loam',
        yieldPerHectare: '4-6 tonnes',
        pestControl: 'Regular monitoring for stem borers and leaf folders',
        fertilizers: 'NPK ratio 120:60:60',
        marketValue: '₹1800-2200/quintal',
        analytics: {
            growthRate: [
                { month: 'Jan', growth: 20 },
                { month: 'Feb', growth: 45 },
                { month: 'Mar', growth: 75 },
                { month: 'Apr', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jan', usage: 150 },
                { month: 'Feb', usage: 200 },
                { month: 'Mar', usage: 180 },
                { month: 'Apr', usage: 120 }
            ],
            marketTrends: [
                { month: 'Jan', price: 1800 },
                { month: 'Feb', price: 1900 },
                { month: 'Mar', price: 2000 },
                { month: 'Apr', price: 2200 }
            ]
        }
    },
    wheat: {
        name: 'Wheat',
        description: 'A hardy winter crop that forms the basis of many food products worldwide.',
        growthPeriod: '100-130 days',
        waterNeeds: 'Moderate',
        temperature: '15-30°C',
        soil: 'Well-drained loam',
        yieldPerHectare: '3.5-4.5 tonnes',
        pestControl: 'Monitor for rust and aphids',
        fertilizers: 'NPK ratio 100:50:50',
        marketValue: '₹2000-2400/quintal',
        analytics: {
            growthRate: [
                { month: 'Jan', growth: 25 },
                { month: 'Feb', growth: 50 },
                { month: 'Mar', growth: 80 },
                { month: 'Apr', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jan', usage: 100 },
                { month: 'Feb', usage: 120 },
                { month: 'Mar', usage: 90 },
                { month: 'Apr', usage: 70 }
            ],
            marketTrends: [
                { month: 'Jan', price: 2000 },
                { month: 'Feb', price: 2100 },
                { month: 'Mar', price: 2300 },
                { month: 'Apr', price: 2400 }
            ]
        }
    },
    sugarcane: {
        name: 'Sugarcane',
        description: 'A tall perennial grass used for sugar production and biofuel.',
        growthPeriod: '300-360 days',
        waterNeeds: 'High',
        temperature: '20-35°C',
        soil: 'Deep, well-drained soil',
        yieldPerHectare: '70-100 tonnes',
        pestControl: 'Regular checks for borers and pyrilla',
        fertilizers: 'NPK ratio 250:115:115',
        marketValue: '₹285-315/quintal',
        analytics: {
            growthRate: [
                { month: 'Q1', growth: 30 },
                { month: 'Q2', growth: 60 },
                { month: 'Q3', growth: 85 },
                { month: 'Q4', growth: 100 }
            ],
            waterUsage: [
                { month: 'Q1', usage: 250 },
                { month: 'Q2', usage: 300 },
                { month: 'Q3', usage: 280 },
                { month: 'Q4', usage: 200 }
            ],
            marketTrends: [
                { month: 'Q1', price: 285 },
                { month: 'Q2', price: 295 },
                { month: 'Q3', price: 305 },
                { month: 'Q4', price: 315 }
            ]
        }
    },
    cotton: {
        name: 'Cotton',
        description: 'A major fiber crop requiring warm climate and moderate rainfall.',
        growthPeriod: '150-180 days',
        waterNeeds: 'Moderate',
        temperature: '21-30°C',
        soil: 'Deep black cotton soil',
        yieldPerHectare: '2-3 tonnes',
        pestControl: 'Monitor for bollworms and whiteflies',
        fertilizers: 'NPK ratio 120:60:60',
        marketValue: '₹5500-6500/quintal',
        analytics: {
            growthRate: [
                { month: 'Jun', growth: 20 },
                { month: 'Jul', growth: 45 },
                { month: 'Aug', growth: 70 },
                { month: 'Sep', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jun', usage: 120 },
                { month: 'Jul', usage: 150 },
                { month: 'Aug', usage: 130 },
                { month: 'Sep', usage: 100 }
            ],
            marketTrends: [
                { month: 'Jun', price: 5500 },
                { month: 'Jul', price: 5800 },
                { month: 'Aug', price: 6200 },
                { month: 'Sep', price: 6500 }
            ]
        }
    },
    maize: {
        name: 'Maize',
        description: 'A versatile crop used for food, feed, and industrial purposes.',
        growthPeriod: '90-120 days',
        waterNeeds: 'Moderate',
        temperature: '20-30°C',
        soil: 'Well-drained loamy soil',
        yieldPerHectare: '5-8 tonnes',
        pestControl: 'Check for stem borers and armyworms',
        fertilizers: 'NPK ratio 150:75:75',
        marketValue: '₹1800-2200/quintal',
        analytics: {
            growthRate: [
                { month: 'Jun', growth: 25 },
                { month: 'Jul', growth: 55 },
                { month: 'Aug', growth: 85 },
                { month: 'Sep', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jun', usage: 110 },
                { month: 'Jul', usage: 140 },
                { month: 'Aug', usage: 120 },
                { month: 'Sep', usage: 90 }
            ],
            marketTrends: [
                { month: 'Jun', price: 1800 },
                { month: 'Jul', price: 1900 },
                { month: 'Aug', price: 2000 },
                { month: 'Sep', price: 2200 }
            ]
        }
    },
    soybean: {
        name: 'Soybean',
        description: 'A protein-rich legume crop with high oil content.',
        growthPeriod: '90-120 days',
        waterNeeds: 'Moderate',
        temperature: '20-30°C',
        soil: 'Well-drained fertile soil',
        yieldPerHectare: '2-3 tonnes',
        pestControl: 'Monitor for pod borers and leaf miners',
        fertilizers: 'NPK ratio 30:60:40',
        marketValue: '₹3800-4200/quintal',
        analytics: {
            growthRate: [
                { month: 'Jun', growth: 30 },
                { month: 'Jul', growth: 60 },
                { month: 'Aug', growth: 90 },
                { month: 'Sep', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jun', usage: 90 },
                { month: 'Jul', usage: 120 },
                { month: 'Aug', usage: 100 },
                { month: 'Sep', usage: 80 }
            ],
            marketTrends: [
                { month: 'Jun', price: 3800 },
                { month: 'Jul', price: 3900 },
                { month: 'Aug', price: 4000 },
                { month: 'Sep', price: 4200 }
            ]
        }
    },
    groundnut: {
        name: 'Groundnut',
        description: 'An important oilseed and food crop.',
        growthPeriod: '120-140 days',
        waterNeeds: 'Moderate',
        temperature: '25-30°C',
        soil: 'Well-drained sandy loam',
        yieldPerHectare: '2-2.5 tonnes',
        pestControl: 'Check for leaf spots and rust',
        fertilizers: 'NPK ratio 20:40:40',
        marketValue: '₹4500-5000/quintal',
        analytics: {
            growthRate: [
                { month: 'Jun', growth: 25 },
                { month: 'Jul', growth: 50 },
                { month: 'Aug', growth: 80 },
                { month: 'Sep', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jun', usage: 80 },
                { month: 'Jul', usage: 100 },
                { month: 'Aug', usage: 90 },
                { month: 'Sep', usage: 70 }
            ],
            marketTrends: [
                { month: 'Jun', price: 4500 },
                { month: 'Jul', price: 4600 },
                { month: 'Aug', price: 4800 },
                { month: 'Sep', price: 5000 }
            ]
        }
    },
    turmeric: {
        name: 'Turmeric',
        description: 'A spice crop with medicinal properties.',
        growthPeriod: '240-300 days',
        waterNeeds: 'Moderate to High',
        temperature: '20-30°C',
        soil: 'Well-drained loamy soil',
        yieldPerHectare: '20-25 tonnes',
        pestControl: 'Monitor for rhizome rot and leaf spot',
        fertilizers: 'NPK ratio 25:50:50',
        marketValue: '₹7000-8000/quintal',
        analytics: {
            growthRate: [
                { month: 'Q1', growth: 20 },
                { month: 'Q2', growth: 45 },
                { month: 'Q3', growth: 75 },
                { month: 'Q4', growth: 100 }
            ],
            waterUsage: [
                { month: 'Q1', usage: 100 },
                { month: 'Q2', usage: 120 },
                { month: 'Q3', usage: 110 },
                { month: 'Q4', usage: 90 }
            ],
            marketTrends: [
                { month: 'Q1', price: 7000 },
                { month: 'Q2', price: 7300 },
                { month: 'Q3', price: 7600 },
                { month: 'Q4', price: 8000 }
            ]
        }
    },
    potato: {
        name: 'Potato',
        description: 'A major root vegetable crop grown worldwide.',
        growthPeriod: '90-120 days',
        waterNeeds: 'Moderate',
        temperature: '15-25°C',
        soil: 'Well-drained loamy soil',
        yieldPerHectare: '25-30 tonnes',
        pestControl: 'Check for late blight and early blight',
        fertilizers: 'NPK ratio 120:60:100',
        marketValue: '₹1000-1500/quintal',
        analytics: {
            growthRate: [
                { month: 'Oct', growth: 30 },
                { month: 'Nov', growth: 60 },
                { month: 'Dec', growth: 90 },
                { month: 'Jan', growth: 100 }
            ],
            waterUsage: [
                { month: 'Oct', usage: 90 },
                { month: 'Nov', usage: 110 },
                { month: 'Dec', usage: 100 },
                { month: 'Jan', usage: 80 }
            ],
            marketTrends: [
                { month: 'Oct', price: 1000 },
                { month: 'Nov', price: 1200 },
                { month: 'Dec', price: 1400 },
                { month: 'Jan', price: 1500 }
            ]
        }
    },
    onion: {
        name: 'Onion',
        description: 'An essential vegetable crop with high market demand.',
        growthPeriod: '130-150 days',
        waterNeeds: 'Moderate',
        temperature: '13-35°C',
        soil: 'Well-drained loamy soil',
        yieldPerHectare: '25-30 tonnes',
        pestControl: 'Monitor for thrips and purple blotch',
        fertilizers: 'NPK ratio 60:60:50',
        marketValue: '₹1500-2500/quintal',
        analytics: {
            growthRate: [
                { month: 'Oct', growth: 25 },
                { month: 'Nov', growth: 55 },
                { month: 'Dec', growth: 85 },
                { month: 'Jan', growth: 100 }
            ],
            waterUsage: [
                { month: 'Oct', usage: 85 },
                { month: 'Nov', usage: 100 },
                { month: 'Dec', usage: 90 },
                { month: 'Jan', usage: 75 }
            ],
            marketTrends: [
                { month: 'Oct', price: 1500 },
                { month: 'Nov', price: 1800 },
                { month: 'Dec', price: 2200 },
                { month: 'Jan', price: 2500 }
            ]
        }
    },
    tomato: {
        name: 'Tomato',
        description: 'A popular vegetable crop with diverse culinary uses.',
        growthPeriod: '90-120 days',
        waterNeeds: 'Moderate',
        temperature: '20-27°C',
        soil: 'Well-drained loamy soil',
        yieldPerHectare: '20-25 tonnes',
        pestControl: 'Check for fruit borer and leaf curl virus',
        fertilizers: 'NPK ratio 100:50:50',
        marketValue: '₹1000-2000/quintal',
        analytics: {
            growthRate: [
                { month: 'Jun', growth: 30 },
                { month: 'Jul', growth: 60 },
                { month: 'Aug', growth: 90 },
                { month: 'Sep', growth: 100 }
            ],
            waterUsage: [
                { month: 'Jun', usage: 95 },
                { month: 'Jul', usage: 115 },
                { month: 'Aug', usage: 105 },
                { month: 'Sep', usage: 85 }
            ],
            marketTrends: [
                { month: 'Jun', price: 1000 },
                { month: 'Jul', price: 1400 },
                { month: 'Aug', price: 1700 },
                { month: 'Sep', price: 2000 }
            ]
        }
    }
};
export function CropManagement() {
    const [searchParams] = useSearchParams();
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [activeChart, setActiveChart] = useState('growth');
    useEffect(() => {
        const crop = searchParams.get('crop');
        if (crop && cropData[crop]) {
            setSelectedCrop(cropData[crop]);
        }
    }, [searchParams]);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Crop Management" }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8", children: Object.entries(cropData).map(([key, crop]) => (_jsxs("button", { onClick: () => setSelectedCrop(crop), className: `p-6 rounded-lg shadow-md transition ${selectedCrop?.name === crop.name
                            ? 'bg-green-50 border-2 border-green-500'
                            : 'bg-white hover:shadow-lg'}`, children: [_jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Sprout, { className: "h-6 w-6 text-green-500 mr-2" }), _jsx("h3", { className: "text-lg font-semibold", children: crop.name })] }), _jsx("p", { className: "text-gray-600 text-sm line-clamp-2", children: crop.description })] }, key))) }), selectedCrop && (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6", children: [selectedCrop.name, " Management Guide"] }), _jsxs("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: [_jsxs("div", { className: "p-4 bg-green-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Plant, { className: "h-5 w-5 text-green-600 mr-2" }), _jsx("h3", { className: "font-semibold", children: "Growth Period" })] }), _jsx("p", { children: selectedCrop.growthPeriod })] }), _jsxs("div", { className: "p-4 bg-blue-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Droplets, { className: "h-5 w-5 text-blue-600 mr-2" }), _jsx("h3", { className: "font-semibold", children: "Water Needs" })] }), _jsx("p", { children: selectedCrop.waterNeeds })] }), _jsxs("div", { className: "p-4 bg-yellow-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Sun, { className: "h-5 w-5 text-yellow-600 mr-2" }), _jsx("h3", { className: "font-semibold", children: "Temperature" })] }), _jsx("p", { children: selectedCrop.temperature })] }), _jsxs("div", { className: "p-4 bg-brown-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Wind, { className: "h-5 w-5 text-brown-600 mr-2" }), _jsx("h3", { className: "font-semibold", children: "Soil Type" })] }), _jsx("p", { children: selectedCrop.soil })] })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6 mb-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Yield per Hectare" }), _jsx("p", { children: selectedCrop.yieldPerHectare })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Pest Control" }), _jsx("p", { children: selectedCrop.pestControl })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Fertilizers" }), _jsx("p", { children: selectedCrop.fertilizers })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Market Value" }), _jsx("p", { children: selectedCrop.marketValue })] })] })] }), _jsxs("div", { className: "bg-gray-50 rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Analytics & Insights" }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { onClick: () => setActiveChart('growth'), className: `px-4 py-2 rounded-lg ${activeChart === 'growth' ? 'bg-green-500 text-white' : 'bg-white'}`, children: "Growth Rate" }), _jsx("button", { onClick: () => setActiveChart('water'), className: `px-4 py-2 rounded-lg ${activeChart === 'water' ? 'bg-blue-500 text-white' : 'bg-white'}`, children: "Water Usage" }), _jsx("button", { onClick: () => setActiveChart('market'), className: `px-4 py-2 rounded-lg ${activeChart === 'market' ? 'bg-purple-500 text-white' : 'bg-white'}`, children: "Market Trends" })] })] }), _jsx("div", { className: "h-80", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(RechartsLineChart, { data: activeChart === 'growth'
                                                ? selectedCrop.analytics.growthRate
                                                : activeChart === 'water'
                                                    ? selectedCrop.analytics.waterUsage
                                                    : selectedCrop.analytics.marketTrends, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: activeChart === 'growth'
                                                        ? 'growth'
                                                        : activeChart === 'water'
                                                            ? 'usage'
                                                            : 'price', stroke: activeChart === 'growth'
                                                        ? '#22c55e'
                                                        : activeChart === 'water'
                                                            ? '#3b82f6'
                                                            : '#a855f7', strokeWidth: 2 })] }) }) })] })] }))] }) }));
}
