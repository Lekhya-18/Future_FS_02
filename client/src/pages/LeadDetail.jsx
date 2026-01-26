import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Send, Calendar, MessageSquare, CheckCircle, Clock, Trash2 } from 'lucide-react';

const LeadDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLead();
    }, [id]);

    const fetchLead = async () => {
        try {
            const res = await api.get(`/leads/${id}`);
            setLead(res.data.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching lead', err);
            navigate('/leads');
        }
    };

    const handleUpdateStatus = async (newStatus) => {
        try {
            const res = await api.put(`/leads/${id}`, { status: newStatus });
            setLead(res.data.data);
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        if (!note.trim()) return;
        try {
            const res = await api.put(`/leads/${id}`, { note });
            setLead(res.data.data);
            setNote('');
        } catch (err) {
            console.error('Error adding note', err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Delete this lead permanently?')) {
            try {
                await api.delete(`/leads/${id}`);
                navigate('/leads');
            } catch (err) {
                console.error('Error deleting lead', err);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={() => navigate('/leads')} style={{ background: 'transparent', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '24px', padding: 0 }}>
                <ArrowLeft size={18} /> Back to Leads
            </button>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: '2', minWidth: '350px' }}>
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>{lead.name}</h1>
                                <p style={{ color: 'var(--text-muted)' }}>{lead.email} • {lead.phone || 'No phone'}</p>
                            </div>
                            <span className={`status-badge status-${lead.status.toLowerCase()}`} style={{ fontSize: '14px', padding: '6px 16px' }}>
                                {lead.status}
                            </span>
                        </div>

                        {lead.message && (
                            <div style={{ marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Initial Query</p>
                                <p style={{ fontSize: '16px', fontStyle: 'italic' }}>"{lead.message}"</p>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                            <button
                                onClick={() => handleUpdateStatus('Contacted')}
                                className="btn-primary"
                                style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.2)' }}
                                disabled={lead.status === 'Contacted'}
                            >
                                Mark as Contacted
                            </button>
                            <button
                                onClick={() => handleUpdateStatus('Converted')}
                                className="btn-primary"
                                style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                                disabled={lead.status === 'Converted'}
                            >
                                Mark as Converted
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{ background: 'transparent', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 16px', borderRadius: '8px', marginLeft: 'auto' }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MessageSquare size={20} /> Interaction History
                        </h3>

                        <div style={{ marginBottom: '24px' }}>
                            <form onSubmit={handleAddNote}>
                                <textarea
                                    placeholder="Add a progress note..."
                                    rows="3"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    style={{ marginBottom: '12px' }}
                                />
                                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Send size={16} /> Save Note
                                </button>
                            </form>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {lead.notes.slice().reverse().map((n, i) => (
                                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                                    <p style={{ marginBottom: '8px' }}>{n.text}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                                        <Clock size={12} /> {new Date(n.timestamp).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Calendar size={20} /> Details
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Source</p>
                                <p>{lead.source}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Created At</p>
                                <p>{new Date(lead.createdAt).toDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))' }}>
                        <h3 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            AI Assistant
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                            Suggested message based on status <strong>{lead.status}</strong>:
                        </p>
                        <div style={{ padding: '12px', background: 'var(--glass-bg)', borderRadius: '8px', fontSize: '13px', fontStyle: 'italic', border: '1px solid var(--glass-border)' }}>
                            {lead.status === 'New' && "Hello " + lead.name + ", thank you for reaching out! We received your inquiry from " + lead.source + " and would love to discuss how we can help..."}
                            {lead.status === 'Contacted' && "Hi " + lead.name + ", just following up on our previous conversation. Do you have any additional questions about our services?"}
                            {lead.status === 'Converted' && "Welcome aboard " + lead.name + "! We're excited to start this journey with you. Our team will send the onboarding documents shortly."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetail;
