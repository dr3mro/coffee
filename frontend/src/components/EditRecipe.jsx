import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/recipes/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    title: data.title,
                    description: data.description,
                    ingredients: Array.isArray(data.ingredients) ? data.ingredients.join('\n') : data.ingredients,
                    instructions: data.instructions,
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch recipe:', err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);

        // Split ingredients and append each
        const ingredientsArray = formData.ingredients.split('\n').filter(i => i.trim() !== '');
        ingredientsArray.forEach(ing => data.append('ingredients', ing));

        data.append('instructions', formData.instructions);
        if (image) {
            data.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/recipes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data,
            });

            if (response.ok) {
                alert('Recipe updated successfully!');
                navigate(`/recipes/${id}`);
            } else {
                const errorText = await response.text();
                alert('Failed to update recipe: ' + errorText);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('Error updating recipe');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
            <h1>Edit Recipe</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Ingredients (one per line)</label>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                        rows="5"
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Instructions</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        required
                        rows="10"
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Image (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                        padding: '1rem',
                        backgroundColor: 'var(--accent-color, #646cff)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        width: '100%'
                    }}
                >
                    Update Recipe
                </button>
            </form>
        </div>
    );
}

export default EditRecipe;
