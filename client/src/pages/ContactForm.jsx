import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Send, CheckCircle, ShieldCheck } from 'lucide-react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        source: 'Website',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/leads', formData);
            setSubmitted(true);
        } catch (err) {
            console.error('Error submitting form', err);
        }
    };

    if (submitted) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                <div style={{ display: 'inline-flex', padding: '20px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: 'var(--success)', marginBottom: '24px' }}>
                    <CheckCircle size={48} />
                </div>
                <h1>Thank You!</h1>
                <p style={{ color: 'var(--text-muted)' }}>We have received your message and will get back to you soon.</p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                    style={{ marginTop: '24px' }}
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
            <div className="glass-card">
                <h1 style={{ marginBottom: '8px' }}>Contact Us</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fill out the form below and we'll be in touch.</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Phone (Optional)</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Your Query / Message</label>
                        <textarea
                            rows="4"
                            required
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            style={{ width: '100%', padding: '10px 12px', background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px' }}
                        ></textarea>
                    </div>
                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Message Source</label>
                        <select
                            value={formData.source}
                            onChange={e => setFormData({ ...formData, source: e.target.value })}
                        >
                            <option value="Website">Website</option>
                            <option value="Referral">Referral</option>
                            <option value="Campaign">Campaign</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <Send size={18} /> Send Message
                    </button>
                </form>

                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <ShieldCheck size={14} /> Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
