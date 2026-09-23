import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
export function SearchBar() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchResults = [
        {
            category: 'crops',
            items: [
                { title: 'Rice Cultivation', path: '/crop-management?crop=rice' },
                { title: 'Wheat Management', path: '/crop-management?crop=wheat' },
                { title: 'Tomato Growing', path: '/crop-management?crop=tomato' },
            ]
        },
        {
            category: 'team',
            items: [
                { title: 'Task Management', path: '/team-collaboration?section=tasks' },
                { title: 'Team Schedule', path: '/team-collaboration?section=schedule' },
                { title: 'Worker Assignments', path: '/team-collaboration?section=workers' },
            ]
        },
        {
            category: 'analytics',
            items: [
                { title: 'Crop Yields', path: '/analytics?type=yields' },
                { title: 'Weather Patterns', path: '/analytics?type=weather' },
                { title: 'Market Trends', path: '/analytics?type=market' },
            ]
        }
    ];
    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            setShowResults(true);
        }
    };
    const handleResultClick = (path) => {
        setShowResults(false);
        setQuery('');
        navigate(path);
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("form", { onSubmit: handleSearch, children: [_jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), onFocus: () => setShowResults(true), placeholder: t('search.placeholder'), className: "w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" }), _jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" })] }), showResults && (_jsx("div", { className: "absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50", children: searchResults.map((category) => (_jsxs("div", { className: "p-2", children: [_jsx("div", { className: "text-sm font-semibold text-gray-600 px-2 py-1", children: t(`search.categories.${category.category}`) }), category.items.map((item) => (_jsx("button", { onClick: () => handleResultClick(item.path), className: "w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition", children: item.title }, item.path)))] }, category.category))) }))] }));
}
