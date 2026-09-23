import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const languages = [
        { code: "en", label: "English" },
        { code: "ml", label: "മലയാളം" },
        { code: "kn", label: "ಕನ್ನಡ" },
        { code: "te", label: "తెలుగు" },
        { code: "ta", label: "தமிழ்" },
    ];
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        const handleTouchOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleTouchOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, []);
    return (_jsxs("div", { className: "relative inline-block text-black", ref: dropdownRef, children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full cursor-pointer shadow-sm hover:border-green-400 touch-manipulation", children: [_jsx(Globe, { className: "h-5 w-5 text-gray-600" }), _jsx("span", { className: "font-medium", children: languages.find((lang) => lang.code === i18n.language)?.label || "Select Language" })] }), isOpen && (_jsx("div", { className: "absolute mt-2 right-0 bg-white shadow-lg rounded-lg w-44 border border-gray-200 z-50", children: languages.map((lang) => (_jsx("button", { onClick: () => changeLanguage(lang.code), className: "flex items-center px-4 py-3 text-sm w-full text-left hover:bg-gray-100 touch-manipulation", children: lang.label }, lang.code))) }))] }));
}
