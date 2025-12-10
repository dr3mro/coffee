import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/recipes')
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch recipes:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container">Loading recipes...</div>;

    return (
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {recipes.map((recipe) => (
                    <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'block', overflow: 'hidden' }}>
                        <img
                            src={`http://localhost:3000/recipes/${recipe.id}/image`}
                            alt={recipe.title}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div style={{ padding: '1rem' }}>
                            <h2 style={{ marginTop: 0 }}>{recipe.title}</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>{recipe.description}</p>
                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', background: 'var(--bg-primary)', borderRadius: '4px' }}>
                                    {recipe.ingredients.length} ingredients
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {recipes.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    <Coffee size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <p>No recipes found. Start adding some!</p>
                </div>
            )}
        </div>
    );
};

export default RecipeList;
