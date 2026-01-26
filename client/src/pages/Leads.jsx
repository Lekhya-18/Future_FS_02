import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Eye, Trash2, Search, Filter } from 'lucide-react';

const LeadList = () => {
    const [leads, setLeads] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const res = await api.get('/leads');
            setLeads(res.data.data);
        } catch (err) {
            console.error('Error fetching leads', err);
        }
    };

    const deleteLead = async (id) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await api.delete(`/leads/${id}`);
                setLeads(leads.filter(l => l._id !== id));
            } catch (err) {
                console.error('Error deleting lead', err);
            }
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Lead Management</h1>
                    <p style={{ color: 'var(--text-muted)' }}>View and manage all your incoming leads</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            style={{ paddingLeft: '40px', width: '250px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>NAME</th>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>EMAIL</th>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>SOURCE</th>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>MESSAGE</th>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px' }}>STATUS</th>
                            <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '14px', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '16px 24px', fontWeight: '500' }}>{lead.name}</td>
                                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{lead.email}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{ fontSize: '13px' }}>{lead.source}</span>
                                </td>
                                <td style={{ padding: '16px 24px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{lead.message || 'No message'}</span>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span className={`status-badge status-${lead.status.toLowerCase()}`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <Link to={`/leads/${lead._id}`} className="btn-icon" style={{ padding: '6px', borderRadius: '6px', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                            <Eye size={18} />
                                        </Link>
                                        <button onClick={() => deleteLead(lead._id)} style={{ background: 'transparent', padding: '6px', borderRadius: '6px', color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadList;
