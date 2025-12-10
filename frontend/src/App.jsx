import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import EditRecipe from './components/EditRecipe';

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<RecipeList />} />
                                <Route path="/recipes/:id" element={<RecipeDetails />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/admin" element={
                                    <RequireAuth>
                                        <AdminPanel />
                                    </RequireAuth>
                                } />
                                <Route path="/recipes/:id/edit" element={
                                    <RequireAuth>
                                        <EditRecipe />
                                    </RequireAuth>
                                } />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
