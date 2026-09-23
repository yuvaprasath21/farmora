import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users, Calendar, ClipboardList } from 'lucide-react';
const tasks = [
    { id: 1, title: 'Prepare fields for rice planting', assignee: 'John Doe', dueDate: '2024-03-20', status: 'in-progress' },
    { id: 2, title: 'Irrigation system maintenance', assignee: 'Jane Smith', dueDate: '2024-03-22', status: 'pending' },
    { id: 3, title: 'Harvest wheat in Field B', assignee: 'Mike Johnson', dueDate: '2024-03-25', status: 'completed' },
];
// Weekly schedule
const schedule = [
    { day: 'Monday', task: 'Soil preparation', assignee: 'John Doe' },
    { day: 'Tuesday', task: 'Seed sowing', assignee: 'Jane Smith' },
    { day: 'Wednesday', task: 'Fertilizer application', assignee: 'Mike Johnson' },
    { day: 'Thursday', task: 'Irrigation check', assignee: 'John Doe' },
    { day: 'Friday', task: 'Pest control', assignee: 'Jane Smith' },
    { day: 'Saturday', task: 'Growth monitoring', assignee: 'Mike Johnson' },
    { day: 'Sunday', task: 'Rest day', assignee: 'All workers' },
];
// Worker assignments
const workers = [
    { name: 'John Doe', role: 'Field Supervisor', currentTask: 'Soil preparation' },
    { name: 'Jane Smith', role: 'Irrigation Specialist', currentTask: 'Seed sowing' },
    { name: 'Mike Johnson', role: 'Harvest Manager', currentTask: 'Fertilizer application' },
];
export function TeamCollaboration() {
    const [searchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState('tasks');
    useEffect(() => {
        const section = searchParams.get('section');
        if (section) {
            setActiveSection(section);
        }
    }, [searchParams]);
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-12", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold mb-8", children: "Team Collaboration" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [_jsxs("button", { onClick: () => setActiveSection('tasks'), className: `p-6 rounded-lg shadow transition flex items-center ${activeSection === 'tasks' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:shadow-lg'}`, children: [_jsx(ClipboardList, { className: "h-6 w-6 text-blue-500 mr-3" }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-semibold", children: "Task Management" }), _jsx("p", { className: "text-sm text-gray-600", children: "Organize and track farm tasks" })] })] }), _jsxs("button", { onClick: () => setActiveSection('schedule'), className: `p-6 rounded-lg shadow transition flex items-center ${activeSection === 'schedule' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:shadow-lg'}`, children: [_jsx(Calendar, { className: "h-6 w-6 text-blue-500 mr-3" }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-semibold", children: "Team Schedule" }), _jsx("p", { className: "text-sm text-gray-600", children: "View and manage work schedules" })] })] }), _jsxs("button", { onClick: () => setActiveSection('workers'), className: `p-6 rounded-lg shadow transition flex items-center ${activeSection === 'workers' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white hover:shadow-lg'}`, children: [_jsx(Users, { className: "h-6 w-6 text-blue-500 mr-3" }), _jsxs("div", { className: "text-left", children: [_jsx("h3", { className: "font-semibold", children: "Worker Assignments" }), _jsx("p", { className: "text-sm text-gray-600", children: "Manage worker roles and tasks" })] })] })] }), _jsxs("div", { className: "bg-white rounded-lg shadow-lg p-6", children: [activeSection === 'tasks' && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Current Tasks" }), _jsx("div", { className: "space-y-4", children: tasks.map(task => (_jsxs("div", { className: "border rounded-lg p-4 hover:shadow transition", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium", children: task.title }), _jsx("span", { className: `px-3 py-1 rounded-full text-sm ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-gray-100 text-gray-800'}`, children: task.status })] }), _jsxs("div", { className: "mt-2 text-sm text-gray-600", children: [_jsxs("p", { children: ["Assigned to: ", task.assignee] }), _jsxs("p", { children: ["Due: ", task.dueDate] })] })] }, task.id))) })] })), activeSection === 'schedule' && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Weekly Schedule" }), _jsxs("table", { className: "w-full border-collapse border border-gray-300", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200", children: [_jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Day" }), _jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Task" }), _jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Assignee" })] }) }), _jsx("tbody", { children: schedule.map((item, index) => (_jsxs("tr", { className: "text-center", children: [_jsx("td", { className: "border border-gray-300 px-4 py-2", children: item.day }), _jsx("td", { className: "border border-gray-300 px-4 py-2", children: item.task }), _jsx("td", { className: "border border-gray-300 px-4 py-2", children: item.assignee })] }, index))) })] })] })), activeSection === 'workers' && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Worker Assignments" }), _jsxs("table", { className: "w-full border-collapse border border-gray-300", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-200", children: [_jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Worker Name" }), _jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Role" }), _jsx("th", { className: "border border-gray-300 px-4 py-2", children: "Current Task" })] }) }), _jsx("tbody", { children: workers.map((worker, index) => (_jsxs("tr", { className: "text-center", children: [_jsx("td", { className: "border border-gray-300 px-4 py-2", children: worker.name }), _jsx("td", { className: "border border-gray-300 px-4 py-2", children: worker.role }), _jsx("td", { className: "border border-gray-300 px-4 py-2", children: worker.currentTask })] }, index))) })] })] }))] })] }) }));
}
