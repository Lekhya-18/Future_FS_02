import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, LogOut, MessageSquare } from 'lucide-react';

const Sidebar = ({ children }) => {
    const { logout, admin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/leads', name: 'Leads', icon: Users },
        { path: '/', name: 'Contact Form', icon: MessageSquare },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div style={{
                width: '260px',
                background: 'var(--bg-card)',
                borderRight: '1px solid var(--border-color)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 10
            }}>
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                    <h2 style={{ fontSize: '20px' }}>Future CRM</h2>
                </div>

                <nav style={{ flex: 1 }}>
                    {menuItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '10px',
                                textDecoration: 'none',
                                color: location.pathname === item.path ? 'white' : 'var(--text-muted)',
                                background: location.pathname === item.path ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                marginBottom: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={20} />
                            <span style={{ fontWeight: '500' }}>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '0 12px' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--glass-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {admin?.email[0].toUpperCase()}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ fontSize: '14px', fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden' }}>{admin?.email}</p>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            borderRadius: '10px',
                            color: 'var(--danger)',
                            background: 'transparent',
                            width: '100%',
                            textAlign: 'left'
                        }}
                    >
                        <LogOut size={20} />
                        <span style={{ fontWeight: '500' }}>Logout</span>
                    </button>
                </div>
            </div>

            <main style={{ flex: 1, padding: '40px', marginLeft: '260px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Sidebar;
