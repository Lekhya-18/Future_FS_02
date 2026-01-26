import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Users, UserCheck, PhoneCall, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total: 0,
        new: 0,
        contacted: 0,
        converted: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/leads');
                const leads = res.data.data;
                const newLeads = leads.filter(l => l.status === 'New').length;
                const contacted = leads.filter(l => l.status === 'Contacted').length;
                const converted = leads.filter(l => l.status === 'Converted').length;

                setStats({
                    total: leads.length,
                    new: newLeads,
                    contacted,
                    converted
                });
            } catch (err) {
                console.error('Error fetching stats', err);
            }
        };
        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="glass-card" style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>{title}</p>
                    <h2 style={{ fontSize: '28px' }}>{value}</h2>
                </div>
                <div style={{ padding: '10px', background: `${color}20`, borderRadius: '10px', color }}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome back to your CRM dashboard</p>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
                <StatCard title="Total Leads" value={stats.total} icon={Users} color="#6366f1" />
                <StatCard title="New Leads" value={stats.new} icon={UserCheck} color="#818cf8" />
                <StatCard title="Contacted" value={stats.contacted} icon={PhoneCall} color="#f59e0b" />
                <StatCard title="Converted" value={stats.converted} icon={TrendingUp} color="#10b981" />
            </div>

            {/* Placeholder for a chart or recent activity */}
            <div className="glass-card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <TrendingUp size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
                    <p>Performance tracking and analytics will appear here</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
