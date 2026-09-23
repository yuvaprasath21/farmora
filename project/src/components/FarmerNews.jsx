import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
export function FarmerNews() {
    const [news, setNews] = useState([
        {
            title: "New Government Scheme for Organic Farming",
            description: "The Ministry of Agriculture announces new subsidies for organic farming certification.",
            link: "https://agricoop.gov.in/",
            date: new Date().toLocaleDateString()
        },
        {
            title: "Weather Alert: Monsoon Update",
            description: "IMD predicts early monsoon arrival in several agricultural regions.",
            link: "https://mausam.imd.gov.in/",
            date: new Date().toLocaleDateString()
        },
        {
            title: "Market Prices: Rice and Wheat Show Strong Growth",
            description: "Current market trends show increasing prices for major crops.",
            link: "https://agmarknet.gov.in/",
            date: new Date().toLocaleDateString()
        }
    ]);
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: _jsxs("h2", { className: "text-xl font-semibold flex items-center", children: [_jsx(Newspaper, { className: "h-6 w-6 text-green-500 mr-2" }), "Daily Agricultural Updates"] }) }), _jsx("div", { className: "space-y-4", children: news.map((item, index) => (_jsxs("div", { className: "border-b last:border-0 pb-4 last:pb-0", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx("h3", { className: "font-medium text-lg text-gray-900", children: item.title }), _jsx("span", { className: "text-sm text-gray-500", children: item.date })] }), _jsx("p", { className: "text-gray-600 mt-1", children: item.description }), _jsxs("a", { href: item.link, target: "_blank", rel: "noopener noreferrer", className: "text-green-600 hover:text-green-700 text-sm mt-2 flex items-center", children: ["Read more ", _jsx(ExternalLink, { className: "h-4 w-4 ml-1" })] })] }, index))) })] }));
}
