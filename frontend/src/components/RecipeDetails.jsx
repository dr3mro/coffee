import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/recipes/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch recipe:', err);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this recipe?')) return;

        try {
            const response = await fetch(`http://localhost:3000/recipes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.ok) {
                alert('Recipe deleted');
                navigate('/');
            } else {
                alert('Failed to delete recipe');
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('Error deleting recipe');
        }
    };

    if (loading) return <div className="container">Loading...</div>;
    if (!recipe) return <div className="container">Recipe not found</div>;

    return (
        <div className="container">
            <Link to="/" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', paddingLeft: 0 }}>
                <ArrowLeft size={20} /> Back to Recipes
            </Link>

            <article className="card" style={{ maxWidth: '800px', margin: '0 auto', overflow: 'hidden' }}>
                <img
                    src={`http://localhost:3000/recipes/${recipe.id}/image`}
                    alt={recipe.title}
                    style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ padding: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{recipe.title}</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{recipe.description}</p>

                    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 2fr' }}>
                        <div>
                            <h3 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>Ingredients</h3>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} style={{ marginBottom: '0.5rem' }}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 style={{ borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>Instructions</h3>
                            <div style={{ marginTop: '1rem', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                                {recipe.instructions}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={16} />
                            <span>Updated: {new Date(recipe.updatedAt).toLocaleDateString()}</span>
                        </div>
                        {user && (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to={`/recipes/${recipe.id}/edit`} className="btn" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)', textDecoration: 'none' }}>
                                    Edit Recipe
                                </Link>
                                <button onClick={handleDelete} className="btn" style={{ backgroundColor: '#ff4444', color: 'white', border: 'none', cursor: 'pointer' }}>
                                    Delete Recipe
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default RecipeDetails;
