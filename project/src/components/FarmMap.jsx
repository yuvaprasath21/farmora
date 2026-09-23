import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { MapPin, Crop } from 'lucide-react';
import { useTranslation } from 'react-i18next';
export function FarmMap() {
    const { t } = useTranslation();
    return (_jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [_jsxs("h3", { className: "text-xl font-semibold mb-4 flex items-center", children: [_jsx(MapPin, { className: "h-6 w-6 text-red-500 mr-2" }), t('map.title')] }), _jsxs("div", { className: "relative h-96 bg-gray-100 rounded-lg overflow-hidden", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?auto=format&fit=crop&q=80", alt: "Farm map", className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: "bg-white p-4 rounded-lg shadow-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Crop, { className: "h-5 w-5 text-green-500" }), _jsx("span", { children: t('map.plotInfo') })] }) }) })] })] }));
}
