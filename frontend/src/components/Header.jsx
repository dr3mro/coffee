import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Coffee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="header" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Coffee size={24} color="var(--accent)" />
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Coffee Recipes</h1>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {user ? (
                    <>
                        <Link to="/admin" className="btn btn-primary" style={{ textDecoration: 'none', backgroundColor: 'var(--accent)', color: 'white' }}>Add Recipe</Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', fontSize: '1rem' }}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Login</Link>
                )}
                <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="Toggle Theme">
                    {theme === 'light' ? <Moon size={24} color="var(--text-primary)" /> : <Sun size={24} color="var(--text-primary)" />}
                </button>
            </div>
        </header>
    );
};

export default Header;
