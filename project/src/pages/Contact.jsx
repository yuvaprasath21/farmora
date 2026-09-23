import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Contact Us" }), _jsxs("div", { className: "bg-white rounded-lg shadow p-6", children: [_jsx("p", { className: "text-gray-600 mb-6", children: "Have any questions? Feel free to reach out to us using the form below." }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700", children: "Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", placeholder: "Enter your name", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700", children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", placeholder: "Enter your email", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700", children: "Subject" }), _jsx("input", { type: "text", name: "subject", value: formData.subject, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", placeholder: "Enter the subject", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700", children: "Message" }), _jsx("textarea", { name: "message", value: formData.message, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", placeholder: "Write your message here", rows: 4, required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition", children: "Send Message" })] }), _jsxs("div", { className: "mt-6 border-t pt-4 text-gray-700", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Contact Details" }), _jsx("p", { children: "\uD83D\uDCCD Address: 123 Farm Road, Green Village, TN" }), _jsx("p", { children: "\uD83D\uDCE7 Email: farmora@gmail.com" }), _jsx("p", { children: "\uD83D\uDCDE Phone: +91 98765 43210" })] })] })] }) }));
}
