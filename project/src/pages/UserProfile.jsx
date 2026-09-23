import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, updateUserMetadata } from '../lib/supabase';
export function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        state: '',
        district: '',
        location: '',
        farm_size: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (!session) {
                    navigate('/');
                    return;
                }
                setUser(session.user);
                // Load user metadata into form
                const metadata = session.user.user_metadata;
                setFormData({
                    full_name: metadata.full_name || '',
                    phone: metadata.phone || '',
                    state: metadata.state || '',
                    district: metadata.district || '',
                    location: metadata.location || '',
                    farm_size: metadata.farm_size || '',
                });
            }
            catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            if (!user)
                throw new Error('No authenticated user');
            await updateUserMetadata({
                full_name: formData.full_name,
                phone: formData.phone,
                state: formData.state,
                district: formData.district,
                location: formData.location,
                farm_size: formData.farm_size,
            });
            setSuccess(true);
            // Force refresh the session to update metadata
            await supabase.auth.refreshSession();
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
        catch (err) {
            console.error('Error updating profile:', err);
            setError(err instanceof Error ? err.message : 'Failed to update profile');
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    if (loading) {
        return (_jsx("div", { className: "min-h-screen bg-gray-50 flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-8", children: "User Profile" }), _jsx("form", { onSubmit: handleSubmit, className: "bg-white shadow-md rounded-lg p-8", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "full_name", className: "block text-sm font-medium text-gray-700", children: "Full Name" }), _jsx("input", { type: "text", id: "full_name", name: "full_name", value: formData.full_name, onChange: handleChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Phone Number" }), _jsx("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "state", className: "block text-sm font-medium text-gray-700", children: "State" }), _jsx("input", { type: "text", id: "state", name: "state", value: formData.state, onChange: handleChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "district", className: "block text-sm font-medium text-gray-700", children: "District" }), _jsx("input", { type: "text", id: "district", name: "district", value: formData.district, onChange: handleChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "location", className: "block text-sm font-medium text-gray-700", children: "Location" }), _jsx("input", { type: "text", id: "location", name: "location", value: formData.location, onChange: handleChange, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "farm_size", className: "block text-sm font-medium text-gray-700", children: "Farm Size (in hectares)" }), _jsx("input", { type: "number", id: "farm_size", name: "farm_size", value: formData.farm_size, onChange: handleChange, min: "0", step: "0.01", className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 px-4 py-2", required: true })] }), error && (_jsx("div", { className: "text-red-600 text-sm bg-red-50 p-3 rounded-md", children: error })), success && (_jsx("div", { className: "text-green-600 text-sm bg-green-50 p-3 rounded-md", children: "Profile updated successfully! Redirecting..." })), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsx("button", { type: "button", onClick: () => navigate('/dashboard'), className: "bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition", children: "Cancel" }), _jsx("button", { type: "submit", disabled: loading, className: "bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50", children: loading ? 'Saving...' : 'Save Profile' })] })] }) })] }) }) }));
}
